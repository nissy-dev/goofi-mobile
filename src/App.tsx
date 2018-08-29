import * as React from 'react'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo'
import { createBottomTabNavigator } from 'react-navigation'
import { TestA, TestB } from './pages'
import { query } from './query'

const httpLink = createHttpLink({
  uri: 'https://api.github.com/graphql'
})

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${process.env.API_TOKEN}`
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

client
  .query({
    query: query
  })
  .then(result => console.log(result))
  .catch(e => console.log(e))

const Root = createBottomTabNavigator({
  searchedList: TestA,
  watchedList: TestB
})

export default class App extends React.Component<{}> {
  render() {
    return (
      <ApolloProvider client={client}>
        <Root />
      </ApolloProvider>
    )
  }
}
