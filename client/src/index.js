import React from 'react'
import ReactDOM from 'react-dom'
import './styles.css'
import App from './App'

import { ApolloClient, HttpLink, InMemoryCache, ApolloProvider } from '@apollo/client'

console.log(`Environment: ${process.env.NODE_ENV}`)

function determineEnivironment() {
  if (process.env.NODE_ENV === "development") return 'http://localhost:3006/graphql'
  return 'https://gym-share.herokuapp.com/graphql'
}

// For hosting and testing
// if (process.env.NODE_ENV === "development"){
//   const apiURI = 'http://localhost:3006/graphql'

//   const client = new ApolloClient({
//     cache: new InMemoryCache(),
//     link: new HttpLink({
//       uri: apiURI
//     })
//   })

//   ReactDOM.render(
//     <ApolloProvider client={client}>
//       <App />
//     </ApolloProvider>,
//     document.getElementById('root')
//   )

//   // return
// }

// const apiURI = 'https://gym-share.herokuapp.com/graphql'
const apiURI = determineEnivironment()

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: apiURI
  })
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)
