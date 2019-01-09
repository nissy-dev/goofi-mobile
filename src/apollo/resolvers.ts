import { ApolloCache } from 'apollo-cache'
import { GET_FAV_ITEMS } from '../query'
import { judgeIsFavItem } from '../utils'

export interface IssueItem {
  id: number
  title: string
  url: string
  avatarUrl: string
}

interface State {
  favItems: IssueItem[]
}

interface Cache {
  cache: ApolloCache<any>
}

interface Variables {
  title: string
  url: string
  avatarUrl: string
}

export const initialState: State = {
  favItems: []
}

let nextFavItemId = 0

export const resolvers = {
  Mutation: {
    addFavItem: (
      _: any,
      { title, url, avatarUrl }: Variables,
      { cache }: Cache
    ) => {
      const previous: State | null = cache.readQuery({ query: GET_FAV_ITEMS })
      const newFavItem = {
        id: nextFavItemId++,
        title,
        url,
        avatarUrl,
        __typename: 'FavItem'
      }
      // validate
      const isDeplicatedItem =
        previous && judgeIsFavItem(newFavItem, previous.favItems)
      if (isDeplicatedItem) return newFavItem

      const data = {
        favItems: previous && previous.favItems.concat([newFavItem])
      }
      cache.writeData({ data })
      return newFavItem
    },
    deleteFavItem: (_: any, { title }: Variables, { cache }: Cache) => {
      const previous: State | null = cache.readQuery({ query: GET_FAV_ITEMS })
      const data = {
        favItems:
          previous &&
          previous.favItems.filter(
            (favItem: IssueItem) => favItem.title !== title
          )
      }
      cache.writeData({ data })
      return null
    }
  }
}
