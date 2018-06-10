import React from 'react'
import { Router } from 'react-router-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import createHistory from 'history/createBrowserHistory'

import Routes from './Routes'
import './styles/index.global.scss'

export const history = createHistory()

export const client = new ApolloClient({
  uri:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000/graphql'
      : 'https://us-central1-event0-portal.cloudfunctions.net/server/graphql',
  request: async (operation) => {
    const token = localStorage.getItem('token')
    operation.setContext({
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        Authorization: token ? `Bearer ${token}` : null,
        'Access-Control-Allow-Origin': '*',
        'Retry-After': 3600,
      },
    })
  },
  onError: ({ networkError, graphQLErrors }) => {
    // eslint-disable-next-line
    networkError?.result?.errors?.forEach((err) => console.error(err.message))
    // eslint-disable-next-line
    networkError?.result?.error && console.error(networkError.result.error)
    // eslint-disable-next-line
    graphQLErrors?.forEach((err) => console.error(err.message))
  },
})

export default () => (
  <Router history={history}>
    <ApolloProvider client={client}>
      <Routes />
    </ApolloProvider>
  </Router>
)
