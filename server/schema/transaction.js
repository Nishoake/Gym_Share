const { gql } = require('apollo-server')
const { pool } = require('../utility/database')
const crypto = require("crypto")

// User ID constant to enable demo without authentication
const userID = process.env.userID

// Type Definitions
const transactionTypeDefs = gql`
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
    avatar_url: String
  }
  type Dashboard {
    id: ID!
    category: String!
    weight: Int!
    avatar_url: String
  }

  type transactionQuery {
    myBorrowingHistory: [History!]!
    myLendingHistory: [History!]!
    myHolds: [Dashboard!]!
    myCheckOuts: [Dashboard!]!
  }

  type transactionMutation {
    checkOut(
      id: String!
    ): Transaction
    checkIn(
      id: String!
    ): Transaction
  }
`


// Resolvers' logic
const transactionResolvers = {
  transactionQuery: {
    myBorrowingHistory: async (root, args, context) => {
      const client = await pool.connect()

      const values = [
        userID
      ]

      try {
        const { rows } = await client
          .query(
            `SELECT e.id, e.category, e.weight, t.check_out_timestamp, t.check_in_timestamp, 
          u.name, u.number, u.avatar_url 
          FROM transactions as t INNER JOIN user_table as u ON t.lender_id = u.id 
          INNER JOIN equipment as e ON t.equipment_id = e.id WHERE t.borrower_id = ($1)`,
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

    myLendingHistory: async (root, args, context) => {
      const client = await pool.connect()

      const values = [
        userID
      ]

      try {
        const { rows } = await client
          .query(
            `SELECT e.id, e.category, e.weight, t.check_out_timestamp, 
        t.check_in_timestamp, u.name, u.number, u.avatar_url 
        FROM transactions as t INNER JOIN user_table as u ON t.borrower_id = u.id 
        INNER JOIN equipment as e ON t.equipment_id = e.id 
        WHERE t.lender_id = ($1)`,
            values
          )
        return rows
      }
      catch (error) {
        console.log(`WARNING: ${error}`)
      }
      finally {
        client.release()
        console.log('Client has been successfully released!')
      }
    },

    myHolds: async (root, args, context) => {
      const client = await pool.connect()

      const values = [
        userID
      ]

      try {
        const { rows } = await client
          .query(
            `SELECT e.id, e.category, e.weight, u.avatar_url FROM equipment as e 
              INNER JOIN user_table as u ON e.user_id = u.id WHERE hold_user_id = ($1)`,
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

    myCheckOuts: async (root, args, context) => {
      const client = await pool.connect()

      const values = [
        userID
      ]

      try {
        const { rows } = await client
          .query(
            `SELECT e.id, e.category, e.weight, u.avatar_url FROM transactions as t 
            INNER JOIN equipment as e on t.lender_id = e.user_id 
            INNER JOIN user_table as u on t.lender_id = u.id 
            WHERE check_in_timestamp IS NULL AND borrower_id = ($1)`,
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
    }
  },

  // -----------------------

  transactionMutation: {
    checkOut: async (root, args, context) => {

      const client = await pool.connect()

      try {
        // Retrieve the ID of the user that placed the hold
        const { rows } = await client
          .query(
            `SELECT hold_user_id FROM equipment WHERE id = ($1) AND user_id = ($2)`,
            [args.id, userID]
          )
        const hold_user_id = rows[0].hold_user_id

        // Generate the necessary data to create a transaction
        // Create the transaction ID
        const id = crypto.randomBytes(8).toString('hex')

        // Create the Check Out Timestamp
        const currentTS = Date.now()
        const checkOutTS = new Date(currentTS).toLocaleString('en-US', { timeZone: 'America/Toronto' })

        const values = [
          id,
          hold_user_id,
          userID,
          args.id,
          checkOutTS
        ]

        const result = await client
          .query(
            `INSERT INTO transactions (id, borrower_id, lender_id, equipment_id, check_out_timestamp) 
              VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            values
          )
        const update = await client
          .query(
            `UPDATE equipment SET transaction_id = ($1), hold_user_id = NULL WHERE id = ($2) 
              RETURNING *`,
            [result.rows[0].id, args.id]
          )

        return result.rows[0]
      }
      catch (error) {
        console.log(`WARNING: ${error}`)
      }
      finally {
        client.release()
      }
    },

    checkIn: async (root, args, context) => {

      const client = await pool.connect()

      try {
        // Create the Check In Timestamp
        const currentTS = Date.now()
        const checkInTS = new Date(currentTS).toLocaleString('en-US', { timeZone: 'America/Toronto' })

        // Querying DB for the current transaction ID
        const query = await client
          .query(
            `SELECT transaction_id FROM equipment WHERE id = ($1)`,
            [args.id]
          )
        console.table(query.rows)

        const values = [
          checkInTS,
          query.rows[0].transaction_id
        ]

        // Complete the Transaction
        const { rows } = await client
          .query(
            `UPDATE transactions SET check_in_timestamp = ($1) 
              WHERE id = ($2) RETURNING *`,
            values
          )

        // Clear the Transaction ID field
        await client
          .query(
            `UPDATE equipment SET transaction_id = NULL WHERE id = ($1)`,
            [args.id]
          )

        return rows[0]
      }
      catch (error) {
        console.log(`WARNING: ${error}`)
      }
      finally {
        client.release()
      }
    }
  }
}

exports.Transaction = transactionTypeDefs
exports.transactionResolvers = transactionResolvers