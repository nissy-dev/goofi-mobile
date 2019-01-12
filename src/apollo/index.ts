import { AsyncStorage } from 'react-native'
import { ApolloProvider, Query, Mutation } from 'react-apollo'
import { ApolloClient, InMemoryCache, ApolloLink, HttpLink } from 'apollo-boost'
import { withClientState } from 'apollo-link-state'
import { persistCache } from 'apollo-cache-persist'
import { resolvers, initialState, IssueItem } from './resolvers'

const cache = new InMemoryCache()
// @ts-ignore
persistCache({ cache, storage: AsyncStorage })

const stateLink = withClientState({
  cache,
  defaults: initialState,
  resolvers
})

const httpLink = new HttpLink({
  uri: 'https://api.github.com/graphql',
  headers: {
    authorization: `Bearer ${process.env.API_TOKEN}`
  }
})

const link = ApolloLink.from([stateLink, httpLink])
const client = new ApolloClient({ link, cache })

export { client, ApolloProvider as Provider, Query, Mutation }
export { IssueItem }
