const { UserInputError, gql, AuthenticationError } = require('apollo-server')
const crypto = require("crypto")
const bcryptjs = require("bcryptjs")

require('dotenv').config()

const { Pool } = require('pg')

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
})

// the pool will emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})

// Type Definitions
const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    password_Hash: String
    number: String!
    email: String!
    house: Int!
    street: String!
    city: String!
    is_validated: Boolean!
  }
  type Equipment {
    id: ID!
    category: String!
    weight: Int!
    user_id: ID!
    is_available: Boolean!
  }
  type Transaction {
    id: ID!
    lender_id: ID!
    borrower_id: ID!
    equipment_id: ID!
    check_out: String!
    check_in: String
  }
  type Token {
    value: String!
  }

  type Query {
    helloWorld: String
    equipmentCount: Int!
    userCount: Int!
    allEquipment(user: String): [Equipment!]!
    allUsers: [User!]!
    me: User
  }

  type Mutation {
    addEquipment(
      category: String!
      weight: Int!
    ): Equipment
    addHold(
      is_available: Boolean!
    ): Equipment
    removeHold(
      is_available: Boolean!
    ): Equipment
    checkOut(
      check_out: String!
    ): Transaction
    checkIn(
      check_in: String!
    ): Transaction
    editUser(
      house: Int!
      street: String!
      city: String!
    ): User
    createUser(
      name: String!
      email: String!
      house: Int!
      street: String!
      city: String!
      password: String!
    ): User
    login(
      email: String!
      password: String!
    ): Token
  }
`


// Resolvers' logic
const resolvers = {
  Query: {
    helloWorld: async () => {
      const client = await pool.connect()
      try {
        const { rows } = await client.query('SELECT name FROM test_table where id = $1', [1])
        console.table(rows)
        return rows[0].name

      } catch (error) {
        console.log(`WARNING: ${error}`)
      } finally {
        client.release()
        console.log('Client has been successfully released!')
      }
    },


    userCount: async () => {
      const client = await pool.connect()
      try {
        const { rows } = await client.query('SELECT COUNT (id) FROM user_table')
        console.table(rows)
        return rows[0].count

      } catch (error) {
        console.log(`WARNING: ${error}`)
      } finally {
        client.release()
        console.log('Client has been successfully released!')
      }
    },


    equipmentCount: async () => {
      const client = await pool.connect()
      try {
        const { rows } = await client.query('SELECT COUNT (id) FROM equipment')
        console.table(rows)
        return rows[0].count

      } catch (error) {
        console.log(`WARNING: ${error}`)
      } finally {
        client.release()
        console.log('Client has been successfully released!')
      }
    },


    allUsers: async () => {
      const client = await pool.connect()
      try {
        const { rows } = await client.query('SELECT * FROM user_table')
        console.table(rows)
        return rows

      } catch (error) {
        console.log(`WARNING: ${error}`)
      } finally {
        client.release()
        console.log('Client has been successfully released!')
      }
    },


    allEquipment: async () => {
      const client = await pool.connect()
      try {
        const { rows } = await client.query('SELECT * FROM equipment')
        console.table(rows)
        return rows

      } catch (error) {
        console.log(`WARNING: ${error}`)
      } finally {
        client.release()
        console.log('Client has been successfully released!')
      }
    }


  //   allBooks: async (root, args) => {
  //     // Fetch all saved book objects and populate the 'author' field
  //     const books = await Book.find({}).populate("author")

  //     // Filter books by author
  //     async function authorFilter(bookToFilter) {
  //       const authorBooks = bookToFilter.filter(book => book.author.name === args.author)

  //       return authorBooks
  //     }

  //     // Filter books by genre
  //     async function genreFilter(bookToFilter) {
  //       const genreBooks = bookToFilter.filter(book => book.genres.includes(args.genre))

  //       return genreBooks
  //     }

  //     // Conditional applying each/both filter(s)
  //     if (!args.author && !args.genre) {
  //       return books
  //     } else if (args.author && args.genre) {
  //       return genreFilter(await authorFilter(books))
  //     } else if (args.genre) {
  //       return genreFilter(books)
  //     }

  //     return authorFilter(books)
  //   },


  //   allAuthors: (root) => Author.find({}),


  //   allUsers: (root) => User.find({}),


  //   me: (root, args, context) => {
  //     return context.currentUser
  //   },
  },



  Mutation: {
    createUser: async (root, args, context) => {
      const client = await pool.connect()

      // Generate an id
      const id = crypto.randomBytes(8).toString("hex");
      
      // Generate a password hash
      const saltRounds = 10
      const hashed = await bcryptjs.hash(args.password, saltRounds)

      const values = [
        id,
        args.name,
        hashed,
        args.email,
        args.house,
        args.street,
        args.city,
      ]
      
      try {
        const { rows } = await client.query('INSERT INTO user_table (id, name, password_hash, email, house, street, city) VALUES ($1, $2, $3, $4, $5, $6, $7)', values)
        console.table(rows)
        return rows

      } catch (error) {
        console.log(`WARNING: ${error}`)
      } finally {
        client.release()
        console.log('Client has been successfully released!')
      }
    }
  //   addBook: async (root, args, context) => {
  //     // only possible if request includes valid token
  //     const currentUser = context.currentUser

  //     if (!currentUser) {
  //       console.log('addbook error')
  //       throw new AuthenticationError("not authenticated")
  //     }

  //     // Search for author
  //     let author = await Author.findOne({ name: args.author })

  //     // If we cannot find the author we create a new author
  //     if (!author) {
  //       const newAuthor = new Author({
  //         name: args.author
  //       })

  //       try {
  //         const savedAuthor = await newAuthor.save()

  //         const book = new Book({ ...args, author: savedAuthor._id })

  //         await book.save()

  //         return book.populate("author").execPopulate()

  //       } catch (error) {
  //         throw new UserInputError(error.message, {
  //           invalidArgs: args,
  //         })
  //       }
  //     }

  //     try {
  //       // Use the returned author to assign the ObjectID to the author field
  //       const book = new Book({ ...args, author: author._id })

  //       await book.save()

  //       return book.populate("author").execPopulate()

  //     } catch (error) {
  //       throw new UserInputError(error.message, {
  //         invalidArgs: args,
  //       })
  //     }

  //   },


  //   editAuthor: async (root, args, context) => {
  //     // only possible if request includes valid token
  //     const currentUser = context.currentUser

  //     if (!currentUser) {
  //       throw new AuthenticationError("not authenticated")
  //     }

  //     // editing 
  //     let updatedAuthor = await Author.findOne({ name: args.name })
  //     if (updatedAuthor) {
  //       try {
  //         updatedAuthor.born = args.setBornTo
  //         return await updatedAuthor.save()

  //       } catch (error) {
  //         throw new UserInputError(error.message, {
  //           invalidArgs: args,
  //         })
  //       }
  //     }

  //     return null
  //   },


  //   createUser: async (root, args, context) => {
  //     try {
  //       // Use the returned author to assign the ObjectID to the author field
  //       const user = new User({ ...args })

  //       await user.save()

  //     } catch (error) {
  //       throw new UserInputError(error.message, {
  //         invalidArgs: args,
  //       })
  //     }
  //   },


  //   login: async (root, args, context) => {
  //     const user = await User.findOne({ username: args.username })

  //     if (!user || args.password !== "Eren") {
  //       throw new UserInputError("wrong credentials")
  //     }

  //     // user object we pass into the jwt function to generate a token
  //     const userForToken = {
  //       username: user.username,
  //       id: user._id
  //     }

  //     // remember the token has only field which is value
  //     return { value: jwt.sign(userForToken, JWT_SECRET) }
  //   },

  }
}

exports.typeDefs = typeDefs
exports.resolvers = resolvers