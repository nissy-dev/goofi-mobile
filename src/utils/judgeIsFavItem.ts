import { IssueNode } from '../query'
import { FavItem } from '../apollo/resolvers'

const judgeIsFavItem = (checkedItem: IssueNode, favItems: FavItem[]) =>
  favItems.filter(
    (favItem: FavItem) => favItem.item.title === checkedItem.title
  ).length > 0

export default judgeIsFavItem
