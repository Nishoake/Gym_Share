const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const { typeDefs, resolvers } = require('./schema')
const jwt = require('jsonwebtoken')

require('dotenv').config()

const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  // context:  async ({ req }) =>  {
  //   const JWT_SECRET = process.env.JWT_SECRET

  //   const auth = req ? req.headers.authorization : null

  //   if (auth && auth.toLowerCase().startsWith('bearer ')) {
  //     const decodedToken = jwt.verify(
  //       auth.substring(7), JWT_SECRET
  //     )
      
  //     // This is portion is expendable
  //     const currentUser = await User.findById(decodedToken.id)
  //     return { currentUser }
  //   }
  
  // },
})

server.applyMiddleware({ app });

app.use((req, res) => {
  res.status(200);
  res.send('Train in Saiyan 👱‍♀️');
  res.end();
})

// Initializing the server
const port = process.env.PORT || 3006
app.listen(port, () => {
  console.log(`Gym Share is listening at ${port}`)
})