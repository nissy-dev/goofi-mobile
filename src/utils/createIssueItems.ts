import { IssueNode } from '../query'
import { IssueItem } from '../apollo'

const createIssueItems = (nodes: IssueNode[]): IssueItem[] => {
  return nodes.map(node => {
    const { id, title, url, author } = node
    return {
      id,
      title,
      url,
      avatarUrl: author != null ? author.avatarUrl : ''
    }
  })
}

export default createIssueItems
