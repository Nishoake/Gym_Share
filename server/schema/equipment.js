const { gql } = require('apollo-server')
const { pool } = require('../utility/database')
const crypto = require("crypto")

// User ID constant to enable demo without authentication
const userID = process.env.userID

// Type Definitions
const equipmentTypeDefs = gql`
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
    avatar_url: String
  }
  type equipmentQuery {
    equipmentCount: Int!
    allEquipment(user: String): [Equipment!]!
    allOtherEquipment(type: String): [Views!]!
    myEquipment(type: String): [Views!]!
  }
  type equipmentMutation {
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
    cancelMyHold(
      id: String!
    ): Equipment
  }
`


// Resolvers' logic
const equipmentResolvers = {
  equipmentQuery: {
    equipmentCount: async () => {
      const client = await pool.connect()

      const values = [
        userID
      ]

      try {
        const { rows } = await client
          .query(
            `SELECT COUNT (*) FROM equipment WHERE user_id = ($1)`,
            values
          )
        return rows[0].count
      }
      catch (error) {
        console.log(`WARNING: ${error}`)
      }
      finally {
        client.release()
      }
    },

    allEquipment: async () => {
      const client = await pool.connect()
      try {
        const { rows } = await client.query(`SELECT * FROM equipment`)
        return rows
      }
      catch (error) {
        console.log(`WARNING: ${error}`)
      }
      finally {
        client.release()
      }
    },

    allOtherEquipment: async (root, args, context) => {
      const client = await pool.connect()

      const values = [
        userID
      ]

      try {
        if (args.type === 'available') {
          console.log("Queried for available Equipment")
          const { rows } = await client
            .query(
              `SELECT e.id, e.category, e.weight, u.name, u.number, u.avatar_url 
              FROM equipment AS e INNER JOIN user_table AS u ON e.user_id = u.id 
              WHERE transaction_id IS NULL AND hold_user_id IS NULL AND user_id != ($1)`,
              values
            )
          return rows
        }
        else if (args.type === 'hold') {
          const { rows } = await client
            .query(
              `SELECT e.id, e.category, e.weight, u.name, u.number, u.avatar_url 
              FROM equipment AS e INNER JOIN user_table AS u ON e.user_id = u.id 
              WHERE hold_user_id IS NOT NULL AND user_id != ($1)`,
              values
            )
          return rows
        }
        else if (args.type === 'checked out') {
          const { rows } = await client
            .query(
              `SELECT e.id, e.category, e.weight, u.name, u.number, u.avatar_url 
              FROM equipment AS e INNER JOIN user_table AS u ON e.user_id = u.id 
              WHERE transaction_id IS NOT NULL AND user_id != ($1)`,
              values
            )
          return rows
        }
        else
          console.log("Failed to provide an argument")
      }
      catch (error) {
        console.log(`WARNING: ${error}`)
      }
      finally {
        client.release()
      }
    },

    myEquipment: async (root, args, context) => {
      const client = await pool.connect()

      const values = [
        userID
      ]

      try {
        if (args.type === 'available') {
          const { rows } = await client
            .query(
              `SELECT e.id, e.category, e.weight, u.name, u.number 
              FROM equipment AS e INNER JOIN user_table AS u ON e.user_id = u.id 
              WHERE transaction_id IS NULL AND hold_user_id IS NULL AND user_id = ($1)`,
              values
            )
          console.table(rows)
          return rows
        }
        else if (args.type === 'hold') {
          const { rows } = await client
            .query(
              `SELECT e.id, e.category, e.weight, u.name, u.number 
              FROM equipment AS e INNER JOIN user_table AS u ON e.user_id = u.id 
              WHERE hold_user_id IS NOT NULL AND user_id = ($1)`,
              values
            )
          console.table(rows)
          return rows
        }
        else if (args.type === 'checked out') {
          const { rows } = await client
            .query(
              `SELECT e.id, e.category, e.weight, u.name, u.number 
              FROM equipment AS e INNER JOIN user_table AS u ON e.user_id = u.id 
              WHERE transaction_id IS NOT NULL AND user_id = ($1)`,
              values
            )
          return rows
        }
        else
          console.log(`Failed to provide an argument`)
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

  equipmentMutation: {
    addEquipment: async (root, args, context) => {
      const client = await pool.connect()

      // Generate an id
      const id = crypto.randomBytes(8).toString("hex")

      const values = [
        id,
        userID,
        args.category,
        args.weight,
      ]

      try {
        const { rows } = await client
          .query(
            `INSERT INTO equipment (id, user_id, category, weight) VALUES ($1, $2, $3, $4) 
            RETURNING *`,
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

    placeHold: async (root, args, context) => {

      const client = await pool.connect()

      const values = [
        userID,
        args.id
      ]

      try {
        const { rows } = await client
          .query(
            `UPDATE equipment SET hold_user_id = ($1) 
            WHERE id = ($2) RETURNING *`,
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

    removeHold: async (root, args, context) => {
      const client = await pool.connect()

      const values = [
        userID,
        args.id
      ]

      try {
        const { rows } = await client
          .query(
            `UPDATE equipment SET hold_user_id = NULL 
            WHERE user_id = ($1) AND id = ($2) RETURNING *`,
            values
          )
        console.table(rows)
        return rows[0]
      }
      catch (error) {
        console.log(`WARNING: ${error}`)
      }
      finally {
        client.release()
      }
    },

    cancelMyHold: async (root, args, context) => {
      const client = await pool.connect()

      const values = [
        userID,
        args.id
      ]

      try {
        const { rows } = await client
          .query(
            `UPDATE equipment SET hold_user_id = NULL WHERE hold_user_id = ($1) 
            AND id = ($2) RETURNING *`,
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
  }
}

exports.Equipment = equipmentTypeDefs
exports.equipmentResolvers = equipmentResolvers