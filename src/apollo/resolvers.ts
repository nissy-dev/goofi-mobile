import gql from 'graphql-tag'
import { ApolloCache } from 'apollo-cache'
import { IssueNode } from '../query'

interface FavItem {
  id: number
  item: IssueNode
}

interface State {
  favItems: FavItem[]
}

interface Cache {
  cache: ApolloCache<any>
}

export const initialState: State = {
  favItems: []
}

let nextFavItemId = 0

export const resolvers = {
  Mutation: {
    addFavItem: (_: any, { item }: { item: IssueNode }, { cache }: Cache) => {
      const query = gql`
        query GetFavItems {
          favItems @client {
            id
            item
          }
        }
      `
      const previous: State | null = cache.readQuery({ query })
      const newFavItem = {
        id: nextFavItemId++,
        item,
        __typename: 'FavItems'
      }
      const deplicatedItem =
        previous &&
        previous.favItems.filter(
          (favItem: FavItem) => favItem.item.title === item.title
        ).length > 0
      const data = {
        favItems:
          previous && !deplicatedItem
            ? previous.favItems.concat([newFavItem])
            : previous
      }
      cache.writeData({ data })
      return newFavItem
    },
    deleteFavItem: (_: any, variables: { id: number }, { cache }: Cache) => {
      const query = gql`
        query GetFavItems {
          favItems @client {
            id
            item
          }
        }
      `
      const previous: State | null = cache.readQuery({ query })
      const data = {
        favItems:
          previous &&
          previous.favItems.filter(
            (favItem: FavItem) => favItem.id !== variables.id
          )
      }
      cache.writeData({ data })
      return null
    }
  }
}
