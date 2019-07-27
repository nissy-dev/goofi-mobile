import {
  useQuery,
  useMutation,
  GET_FAV_ITEMS,
  ADD_FAV_ITEM,
  DELETE_FAV_ITEM
} from '../apollo'
import { IssueItem } from '../types'


export function useFavoriteOperation (selectedItem: IssueItem) {
  const { data } = useQuery<{ favItems: IssueItem[] }>(GET_FAV_ITEMS)
  const [addFavItem] = useMutation(ADD_FAV_ITEM, {
    variables: { ...selectedItem }
  })
  const [deleteFavItem] = useMutation(DELETE_FAV_ITEM, {
    variables: { ...selectedItem }
  })

  return { data, addFavItem, deleteFavItem }
}
