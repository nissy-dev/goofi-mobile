import { ApolloCache } from 'apollo-cache'
import { IssueNode, GET_FAV_ITEMS } from '../query'
import { judgeIsFavItem } from '../utils'

export interface FavItem {
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
      const previous: State | null = cache.readQuery({ query: GET_FAV_ITEMS })
      const newFavItem = {
        id: nextFavItemId++,
        item,
        __typename: 'FavItems'
      }
      // validate
      const deplicatedItem =
        previous && judgeIsFavItem(newFavItem.item, previous.favItems)
      if (deplicatedItem) return null

      const data = {
        favItems: previous && previous.favItems.concat([newFavItem])
      }
      cache.writeData({ data })
      return newFavItem
    },
    deleteFavItem: (_: any, variables: { id: number }, { cache }: Cache) => {
      const previous: State | null = cache.readQuery({ query: GET_FAV_ITEMS })
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
