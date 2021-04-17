const { UserInputError, gql, AuthenticationError } = require('apollo-server')
const crypto = require("crypto")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")

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
    password_hash: String
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
    transaction_id: ID
    hold_user_id: ID
  }
  type Views {
    id: ID!
    category: String!
    weight: Int!
    name: String!
    number: String!
    avatar: String
  }
  type Transaction {
    id: ID!
    lender_id: ID!
    borrower_id: ID!
    equipment_id: ID!
    check_out_timestamp: String!
    check_in_timestamp: String
  }
  type History {
    id: ID!
    category: String!
    weight: Int!
    check_out_timestamp: String!
    check_in_timestamp: String
    name: String!
    number: String!
    avatar: String
  }
  type Token {
    value: String!
  }

  type Query {
    helloWorld: String
    equipmentCount: Int!
    userCount: Int!
    allEquipment(user: String): [Equipment!]!
    allOtherEquipment(type: String): [Views!]!
    myEquipment(type: String): [Views!]!
    allUsers: [User!]!
    myBorrowingHistory: [History!]!
    myLendingHistory: [History!]!
    myAccount: [User!]!
  }

  type Mutation {
    addEquipment(
      category: String!
      weight: Int!
    ): Equipment
    placeHold(
      id: String!
    ): Equipment
    removeHold(
      id: String!
    ): Equipment
    checkOut(
      id: String!
    ): Transaction
    checkIn(
      id: String!
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
        console.log(rows)
        return rows

      } catch (error) {
        console.log(`WARNING: ${error}`)
      } finally {
        client.release()
        console.log('Client has been successfully released!')
      }
    },


    allOtherEquipment: async (root, args, context) => {
      console.log("Queried for allOtherEquipment")
      const client = await pool.connect()

      // Uncomment once testing of views has been complete
      // const values = [
      //   context.currentUser.id,
      // ]
      const values = [
        '9091b57448631e1e'
      ]

      try {
        if(args.type === 'available'){
          console.log("Queried for available Equipment")
          const { rows } = await client.query('SELECT e.id, e.category, e.weight, u.name, u.number FROM equipment AS e INNER JOIN user_table AS u ON e.user_id = u.id WHERE transaction_id IS NULL AND hold_user_id IS NULL AND user_id != ($1)', values)
          console.table(rows)
          console.log(rows)
          return rows
        } else if (args.type === 'hold'){
          const { rows } = await client.query('SELECT e.id, e.category, e.weight, u.name, u.number FROM equipment AS e INNER JOIN user_table AS u ON e.user_id = u.id WHERE hold_user_id IS NOT NULL AND user_id != ($1)', values)
          console.table(rows)
          console.log(rows)
          return rows
        } else if (args.type === 'checked out') {
          const { rows } = await client.query('SELECT e.id, e.category, e.weight, u.name, u.number FROM equipment AS e INNER JOIN user_table AS u ON e.user_id = u.id WHERE transaction_id IS NOT NULL AND user_id != ($1)', values)
          console.table(rows)
          console.log(rows)
          return rows
        } else
          console.log("Failed to provide an argument")

      } catch (error) {
        console.log(`WARNING: ${error}`)
      } finally {
        client.release()
        console.log('Client has been successfully released!')
      }
    },


    myEquipment: async (root, args, context) => {
      const client = await pool.connect()

      const values = [
        context.currentUser.id,
      ]

      try {
        if(args.type === 'available'){
          const { rows } = await client.query('SELECT e.id, e.category, e.weight, u.name, u.number FROM equipment AS e INNER JOIN user_table AS u ON e.user_id = u.id WHERE transaction_id IS NULL AND hold_user_id IS NULL AND user_id = ($1)', values)
          console.table(rows)
          console.log(rows)
          return rows
        } else if (args.type === 'hold'){
          const { rows } = await client.query('SELECT e.id, e.category, e.weight, u.name, u.number FROM equipment AS e INNER JOIN user_table AS u ON e.user_id = u.id WHERE hold_user_id IS NOT NULL AND user_id = ($1)', values)
          console.table(rows)
          console.log(rows)
          return rows
        } else if (args.type === 'checked out') {
          const { rows } = await client.query('SELECT e.id, e.category, e.weight, u.name, u.number FROM equipment AS e INNER JOIN user_table AS u ON e.user_id = u.id WHERE transaction_id IS NOT NULL AND user_id = ($1)', values)
          console.table(rows)
          console.log(rows)
          return rows
        } else
          console.log("Failed to provide an argument")

      } catch (error) {
        console.log(`WARNING: ${error}`)
      } finally {
        client.release()
        console.log('Client has been successfully released!')
      }
    },


    myBorrowingHistory: async (root, args, context) => {
      const client = await pool.connect()

      const values = [
        context.currentUser.id,
      ]

      try {
        const { rows } = await client.query('SELECT e.id, e.category, e.weight, t.check_out_timestamp, t.check_in_timestamp, u.name, u.number FROM transactions as t INNER JOIN user_table as u ON t.lender_id = u.id INNER JOIN equipment as e ON t.equipment_id = e.id WHERE t.borrower_id = ($1)', values)
        console.table(rows)
        console.log(rows)
        return rows

      } catch (error) {
        console.log(`WARNING: ${error}`)
      } finally {
        client.release()
        console.log('Client has been successfully released!')
      }
    },


    myLendingHistory: async (root, args, context) => {
      const client = await pool.connect()

      const values = [
        context.currentUser.id,
      ]

      try {
        const { rows } = await client.query('SELECT e.id, e.category, e.weight, t.check_out_timestamp, t.check_in_timestamp, u.name, u.number FROM transactions as t INNER JOIN user_table as u ON t.borrower_id = u.id INNER JOIN equipment as e ON t.equipment_id = e.id WHERE t.lender_id = ($1)', values)
        console.table(rows)
        console.log(rows)
        return rows

      } catch (error) {
        console.log(`WARNING: ${error}`)
      } finally {
        client.release()
        console.log('Client has been successfully released!')
      }
    },


    myAccount: async (root, args, context) => {
      const client = await pool.connect()

      const values = [
        context.currentUser.id,
      ]

      try {
        const { rows } = await client.query('SELECT u.name, u.number, u.email, u.house, u.street, u.city FROM user_table AS u WHERE id = ($1)', values)
        console.table(rows)
        console.log(rows)
        return rows

      } catch (error) {
        console.log(`WARNING: ${error}`)
      } finally {
        client.release()
        console.log('Client has been successfully released!')
      }
    },
  },



  Mutation: {
    createUser: async (root, args, context) => {
      console.log(`args = ${JSON.stringify(args)}`)
      const client = await pool.connect()

      // Generate an id
      const id = crypto.randomBytes(8).toString("hex")
      
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
        const { rows } = await client.query('INSERT INTO user_table (id, name, password_hash, email, house, street, city) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', values)
        console.table(rows)
        return rows[0]

      } catch (error) {
          console.log(`WARNING: ${error}`)
      } finally {
          client.release()
          console.log('Client has been successfully released!')
      }
    },

    addEquipment: async (root, args, context) => {
      // Check for authorization
      if (!currentUser) {
        throw new AuthenticationError("not authorized")
      }

      const client = await pool.connect()

      // Generate an id
      const id = crypto.randomBytes(8).toString("hex")

      const values = [
        id,
        context.currentUser.id,
        args.category,
        args.weight,
      ]
      
      try {
        
        const { rows } = await client.query('INSERT INTO equipment (id, user_id, category, weight) VALUES ($1, $2, $3, $4) RETURNING *', values)
        console.table(rows)
        return rows[0]

      } catch (error) {
          console.log(`WARNING: ${error}`)
      } finally {
          client.release()
          console.log('Client has been successfully released!')
      }
    },

    placeHold: async (root, args, context) => {
      // Check for authorization
      // if (!currentUser) {
      //   console.log("not authorized")
      //   throw new AuthenticationError("not authorized")
      // }

      const client = await pool.connect()

      const values = [
        '9091b57448631e1e',
        args.id
      ]
      // const values = [
      //   context.currentUser.id,
      //   args.id
      // ]
      
      try {
        
        const { rows } = await client.query('UPDATE equipment SET hold_user_id = ($1) WHERE id = ($2) RETURNING *', values)
        console.table(rows)
        return rows[0]

      } catch (error) {
          console.log(`WARNING: ${error}`)
      } finally {
          client.release()
          console.log('Client has been successfully released!')
      }
    },

    removeHold: async (root, args, context) => {
      // Check for authorization
      if (!currentUser) {
        throw new AuthenticationError("not authorized")
      }

      const client = await pool.connect()

      const values = [
        context.currentUser.id,
        args.id
      ]
      
      try {
        const { rows } = await client.query('UPDATE equipment SET hold_user_id IS NULL WHERE user_id = ($1) AND id = ($2) RETURNING *', values)
        console.table(rows)
        return rows[0]

      } catch (error) {
          console.log(`WARNING: ${error}`)
      } finally {
          client.release()
          console.log('Client has been successfully released!')
      }
    },

    checkOut: async (root, args, context) => {
      // Check for authorization
      if (!currentUser) {
        throw new AuthenticationError("not authorized")
      }

      const client = await pool.connect()

      try {
        // Retrieve the ID of the user that placed the hold
        const { rows } = await client.query('SELECT hold_user_id FROM equipment WHERE id = ($1) AND user_id = ($2)', [args.id, context.currentUser.id])
        const hold_user_id = rows[0].hold_user_id
        
        // Generate the necessary data to create a transaction
        // Create the transaction ID
        const id = crypto.randomBytes(8).toString("hex")

        // Create the Check Out Timestamp
        const currentTS = Date.now()
        const checkOutTS = new Date(currentTS).toLocaleString('en-US', { timeZone: 'America/Toronto' })

        const values = [
          id,
          hold_user_id,
          context.currentUser.id,
          args.id,
          checkOutTS
        ]

        const result = await client.query('INSERT INTO transactions (id, borrower_id, lender_id, equipment_id, check_out_timestamp) VALUES ($1, $2, $3, $4, $5) RETURNING *', values)
        const update = await client.query('UPDATE equipment SET transaction_id = ($1), hold_user_id IS NULL WHERE id = ($2) RETURNING *', [result.rows[0].id, args.id])

        console.table(result.rows)
        console.log(`CO: ${result.rows[0].check_out_timestamp}`)

        console.table(update.rows)

        return result.rows[0]

      } catch (error) {
          console.log(`WARNING: ${error}`)
      } finally {
          client.release()
          console.log('Client has been successfully released!')
      }
    },
    
    checkIn: async (root, args, context) => {
      // Check for authorization
      if (!currentUser) {
        throw new AuthenticationError("not authorized")
      }
      
      const client = await pool.connect()

      try {
        // Create the Check In Timestamp
        const currentTS = Date.now()
        const checkInTS = new Date(currentTS).toLocaleString('en-US', { timeZone: 'America/Toronto' })

        // Querying DB for the current transaction ID
        const query = await client.query('SELECT transaction_id FROM equipment WHERE id = ($1)', [args.id])
        console.table(query.rows)

        const values = [
          checkInTS,
          query.rows[0].transaction_id
        ]

        // Complete the Transaction
        const { rows } = await client.query('UPDATE transactions SET check_in_timestamp = ($1) WHERE id = ($2) RETURNING *', values)

        // Clear the Transaction ID field
        await client.query('UPDATE equipment SET transaction_id IS NULL WHERE id = ($1)', [args.id])

        console.table(rows)
        return rows[0]

      } catch (error) {
          console.log(`WARNING: ${error}`)
      } finally {
          client.release()
          console.log('Client has been successfully released!')
      }
    },

     login: async (root, args, context) => {
      const client = await pool.connect()

      try {
        // find user in PG using the provided email
        const { rows } = await client.query('SELECT * from user_table WHERE email = ($1)', [args.email])
        const user = rows[0]
        const pwh = user.password_hash

        // Authenticate the user based on credentials
        const passwordCorrect = user === null
          ? false
          : await bcryptjs.compare(args.password, pwh)
        
        // If incorrect execution jumps to the catch block
        if (!(user && passwordCorrect)){
          throw new UserInputError("wrong credentials")
        }

        // For now just send the user's id
        const payload = {
          id: user.id
        }

        // Create the token
        const token = jwt.sign(payload, process.env.JWT_SECRET)

        // Send the token
        return {value: token}
      } catch (error) {
          throw new UserInputError("wrong credentials")
      } finally {
          client.release()
          console.log('Client has been successfully released!')
      }
    }

  }
}

exports.typeDefs = typeDefs
exports.resolvers = resolvers