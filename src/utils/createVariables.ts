import { IssueNode } from '../query'

const createVariables = (item: IssueNode) => {
  const { title, url, author } = item
  return {
    title,
    url,
    avatarUrl: author ? author.avatarUrl : ''
  }
}

export default createVariables
