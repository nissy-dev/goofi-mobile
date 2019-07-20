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
import { HttpLink } from 'apollo-link-http'
import { persistCache } from 'apollo-cache-persist'
import { resolvers, initialState } from './resolvers'

const cache = new InMemoryCache()
// @ts-ignore
persistCache({ cache, storage: AsyncStorage })

const link = new HttpLink({
  uri: 'https://api.github.com/graphql',
  headers: {
    authorization: `Bearer ${process.env.API_TOKEN}`
  }
})

const client = new ApolloClient({ cache, link, resolvers })
// write default value
cache.writeData({ data: { ...initialState, __typename: 'favItems' } })

export {
  client,
  ApolloProvider as Provider,
  Query,
  Mutation,
  useQuery,
  useMutation
}
