const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const { typeDefs, resolvers } = require('./schema')
const { pool } = require('./utility/database')
const jwt = require('jsonwebtoken')

require('dotenv').config()

// Initializing the Express Server
const app = express()
const port = process.env.PORT || 3005
app.listen(port, () => {
  console.log(`Gym Share is listening at ${port}`)
})


// Initializing the Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context:  async ({ req }) =>  {
    const JWT_SECRET = process.env.JWT_SECRET
    const client = await pool.connect()

    try {
      const auth = req ? req.headers.authorization : null

      if (auth && auth.toLowerCase().startsWith('bearer ')) {
        const decodedToken = jwt.verify(
          auth.substring(7), JWT_SECRET
        )

        // This is portion is expendable
        const { rows } = await client.query('SELECT * from user_table WHERE id = ($1)', [decodedToken.id])
        const currentUser = rows[0]
        
        return { currentUser }
      }
    } catch (error) {
        console.log(`WARNING: ${error}`)
    } finally {
        client.release()
    }
    
  
  },
})

// Integrating the Apollo Server with the Express Server
server.applyMiddleware({ app });

// Setting up the Client
app.use(express.static('build'))