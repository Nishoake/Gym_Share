const express = require('express')
const bodyParser = require('body-parser')
const graphqlExpress = require('apollo-server-express')

const myGraphQLSchema = // ... define or import your schema here!

require('dotenv').config()

app = express()

// Middleware
app.use(bodyParser.json())
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema: myGraphQLSchema }))

// Intialize port
const port = process.env.PORT || 3006
app.listen(port, () => {
  console.log(`Gym Share app is currently listening at ${port}`)
})

// Routes
app.get('/', async (request, response) => {
  console.log(`The client is requesting an update on the Gym Share App`)

  response.json('Train In-Saiyan 👱‍♀️')
})