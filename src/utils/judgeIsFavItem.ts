import { IssueItem } from '../types'

const judgeIsFavItem = (checkedItem: IssueItem, favItems: IssueItem[]) =>
  favItems.filter((favItem: IssueItem) => favItem.id === checkedItem.id)
    .length > 0

export default judgeIsFavItem
