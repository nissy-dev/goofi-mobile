import * as React from 'react'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo'
import gql from 'graphql-tag'
import { createBottomTabNavigator } from 'react-navigation'
import { TestA, TestB } from './pages'

const httpLink = createHttpLink({
  uri: 'https://api.github.com/graphql'
})

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${API_TOKEN}`
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

client
  .query({
    query: gql`
      {
        search(
          first: 1
          query: "language: javascript good-first-issues:>1 stars:>500"
          type: REPOSITORY
        ) {
          repositoryCount
          pageInfo {
            startCursor
            endCursor
            hasNextPage
          }
          nodes {
            ... on Repository {
              owner {
                id
                avatarUrl
                login
                url
              }
              id
              description
              name
              url
              issues(
                first: 100
                labels: ["good first issue"]
                states: OPEN
                orderBy: { field: UPDATED_AT, direction: DESC }
              ) {
                totalCount
                nodes {
                  title
                  url
                  author {
                    avatarUrl
                  }
                  updatedAt
                }
              }
              stargazers {
                totalCount
              }
            }
          }
        }
      }
    `
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
