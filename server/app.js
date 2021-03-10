const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const { typeDefs, resolvers } = require('./schema')

const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
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