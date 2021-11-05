const { UserInputError, gql } = require('apollo-server')
const { pool } = require('../utility/database')
const crypto = require("crypto")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")

// User ID constant to enable demo without authentication
const userID = process.env.userID

// Type Definitions
const userTypeDefs = gql`
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
    avatar_url: String!
  }
  type Token {
    value: String!
  }
  type Query {
    userCount: Int!
    allUsers: [User!]!
    myAccount: [User!]!
  }
  type Mutation {
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
const userResolvers = {
  Query: {
    userCount: async () => {
      const client = await pool.connect()
      try {
        const { rows } = await client.query(`SELECT COUNT (id) FROM user_table`)
        return rows
      }
      catch (error) {
        console.log(`WARNING: ${error}`)
      }
      finally {
        client.release()
      }
    },


    allUsers: async () => {
      const client = await pool.connect()
      try {
        const { rows } = await client.query(`SELECT * FROM user_table`)
        return rows
      }
      catch (error) {
        console.log(`WARNING: ${error}`)
      }
      finally {
        client.release()
      }
    },

    myAccount: async (root, args, context) => {
      const client = await pool.connect()

      const values = [
        userID
      ]

      try {
        const { rows } = await client
          .query(
            `SELECT u.name, u.number, u.email, u.house, u.street, u.city, u.avatar_url 
            FROM user_table AS u WHERE id = ($1)`,
            values
          )
        return rows
      }
      catch (error) {
        console.log(`WARNING: ${error}`)
      }
      finally {
        client.release()
      }
    },
  },

  // -----------------------

  Mutation: {
    createUser: async (root, args, context) => {
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
        const { rows } = await client
          .query(
            `INSERT INTO user_table (id, name, password_hash, email, house, street, city) 
            VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            values
          )
        return rows[0]
      }
      catch (error) {
        console.log(`WARNING: ${error}`)
      }
      finally {
        client.release()
      }
    },

    login: async (root, args, context) => {
      const client = await pool.connect()

      try {
        // find user in PG using the provided email
        const { rows } = await client
          .query(
            `SELECT * from user_table WHERE email = ($1)`,
            [args.email]
          )
        const user = rows[0]
        const pwh = user.password_hash

        // Authenticate the user based on credentials
        const passwordCorrect = user === null
          ? false
          : await bcryptjs.compare(args.password, pwh)

        // If incorrect execution jumps to the catch block
        if (!(user && passwordCorrect)) {
          throw new UserInputError(`wrong credentials`)
        }

        // For now just send the user's id
        const payload = {
          id: user.id
        }

        // Create the token
        const token = jwt.sign(payload, process.env.JWT_SECRET)

        // Send the token
        return { value: token }
      }
      catch (error) {
        throw new UserInputError(`wrong credentials => ${error}`)
      } finally {
        client.release()
      }
    }
  }
}

exports.User = userTypeDefs
exports.userResolvers = userResolvers