import { AsyncStorage } from 'react-native'
import {
  ApolloProvider,
  Query,
  Mutation,
  useQuery,
  useMutation
} from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { withClientState } from 'apollo-link-state'
import { persistCache } from 'apollo-cache-persist'
import { resolvers, initialState } from './resolvers'

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

export {
  client,
  ApolloProvider as Provider,
  Query,
  Mutation,
  useQuery,
  useMutation
}
