const { UserInputError, gql, AuthenticationError } = require('apollo-server')
const crypto = require("crypto")

const { Client } = require('pg')

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
})

client.connect();

client.query('S')

// let authors = [
//   {
//     name: 'Robert Martin',
//     id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
//     born: 1952,
//   },
//   {
//     name: 'Martin Fowler',
//     id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
//     born: 1963
//   },
//   {
//     name: 'Fyodor Dostoevsky',
//     id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
//     born: 1821
//   },
//   {
//     name: 'Joshua Kerievsky', // birthyear not known
//     id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
//   },
//   {
//     name: 'Sandi Metz', // birthyear not known
//     id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
//   },
// ]

// let books = [
//   {
//     title: 'Clean Code',
//     published: 2008,
//     author: 'Robert Martin',
//     id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring']
//   },
//   {
//     title: 'Agile software development',
//     published: 2002,
//     author: 'Robert Martin',
//     id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
//     genres: ['agile', 'patterns', 'design']
//   },
//   {
//     title: 'Refactoring, edition 2',
//     published: 2018,
//     author: 'Martin Fowler',
//     id: "afa5de00-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring']
//   },
//   {
//     title: 'Refactoring to patterns',
//     published: 2008,
//     author: 'Joshua Kerievsky',
//     id: "afa5de01-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring', 'patterns']
//   },
//   {
//     title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
//     published: 2012,
//     author: 'Sandi Metz',
//     id: "afa5de02-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring', 'design']
//   },
//   {
//     title: 'Crime and punishment',
//     published: 1866,
//     author: 'Fyodor Dostoevsky',
//     id: "afa5de03-344d-11e9-a414-719c6709cf3e",
//     genres: ['classic', 'crime']
//   },
//   {
//     title: 'The Demon ',
//     published: 1872,
//     author: 'Fyodor Dostoevsky',
//     id: "afa5de04-344d-11e9-a414-719c6709cf3e",
//     genres: ['classic', 'revolution']
//   },
// ]

// Type Definitions
const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    password_Hash: String!
    number: Int!
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

  type Author {
    name: String!
    id: ID
    born: Int
    bookCount: Int
  }
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }
  type Token {
    value: String!
  }
  type Query {
    equipmentCount: Int!
    userCount: Int!
    allEquipment(user: String): [Equipment!]!
    allUsers: [User!]!
    me: User

    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
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
      number: Int!
      email: String!
      house: Int!
      street: String!
      city: String!
    ): User
    login(
      email: String!
      password: String!
    ): Token

    
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`


// Resolvers' logic
const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),


    authorCount: () => Author.collection.countDocuments(),


    allBooks: async (root, args) => {
      // Fetch all saved book objects and populate the 'author' field
      const books = await Book.find({}).populate("author")

      // Filter books by author
      async function authorFilter(bookToFilter) {
        const authorBooks = bookToFilter.filter(book => book.author.name === args.author)

        return authorBooks
      }

      // Filter books by genre
      async function genreFilter(bookToFilter) {
        const genreBooks = bookToFilter.filter(book => book.genres.includes(args.genre))

        return genreBooks
      }

      // Conditional applying each/both filter(s)
      if (!args.author && !args.genre) {
        return books
      } else if (args.author && args.genre) {
        return genreFilter(await authorFilter(books))
      } else if (args.genre) {
        return genreFilter(books)
      }

      return authorFilter(books)
    },


    allAuthors: (root) => Author.find({}),


    allUsers: (root) => User.find({}),


    me: (root, args, context) => {
      return context.currentUser
    },
  },



  Author: {
    bookCount: async (root) => {
      const booksWritten = await Book.find({ author: { $in: root._id } })
      return booksWritten.length
    }
  },



  Mutation: {
    addBook: async (root, args, context) => {
      // only possible if request includes valid token
      const currentUser = context.currentUser

      if (!currentUser) {
        console.log('addbook error')
        throw new AuthenticationError("not authenticated")
      }

      // Search for author
      let author = await Author.findOne({ name: args.author })

      // If we cannot find the author we create a new author
      if (!author) {
        const newAuthor = new Author({
          name: args.author
        })

        try {
          const savedAuthor = await newAuthor.save()

          const book = new Book({ ...args, author: savedAuthor._id })

          await book.save()

          return book.populate("author").execPopulate()

        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      }

      try {
        // Use the returned author to assign the ObjectID to the author field
        const book = new Book({ ...args, author: author._id })

        await book.save()

        return book.populate("author").execPopulate()

      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

    },


    editAuthor: async (root, args, context) => {
      // only possible if request includes valid token
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      // editing 
      let updatedAuthor = await Author.findOne({ name: args.name })
      if (updatedAuthor) {
        try {
          updatedAuthor.born = args.setBornTo
          return await updatedAuthor.save()

        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      }

      return null
    },


    createUser: async (root, args, context) => {
      try {
        // Use the returned author to assign the ObjectID to the author field
        const user = new User({ ...args })

        await user.save()

      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },


    login: async (root, args, context) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== "Eren") {
        throw new UserInputError("wrong credentials")
      }

      // user object we pass into the jwt function to generate a token
      const userForToken = {
        username: user.username,
        id: user._id
      }

      // remember the token has only field which is value
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },

  }
}

exports.typeDefs = typeDefs
exports.resolvers = resolvers