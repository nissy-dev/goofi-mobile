import { IssueItem } from '../types'

const judgeIsFavItem = (
  checkedItem?: IssueItem,
  data?: { favItems: IssueItem[] } | null
) => {
  if (checkedItem == null || data == null) {
    return false
  }

  return (
    data.favItems.filter((favItem: IssueItem) => favItem.id === checkedItem.id)
      .length > 0
  )
}

export default judgeIsFavItem
