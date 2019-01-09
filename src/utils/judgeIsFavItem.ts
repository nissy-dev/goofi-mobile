import { IssueNode } from '../query'
import { FavItem } from '../apollo/resolvers'

const judgeIsFavItem = (
  checkedItem: IssueNode | FavItem,
  favItems: FavItem[]
) =>
  favItems.filter((favItem: FavItem) => favItem.title === checkedItem.title)
    .length > 0

export default judgeIsFavItem
