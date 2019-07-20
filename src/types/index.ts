export interface IssueItem {
  id: string
  title: string
  url: string
  avatarUrl: string
  __typename?: string // for favItem
}

export interface IssueNode {
  id: string
  title: string
  url: string
  author?: {
    avatarUrl: string
  }
  updatedAt: string
}

export interface Issue {
  totalCount: number
  nodes: IssueNode[]
}

export interface RepositoryNode {
  owner: {
    id: string
    avatarUrl: string
    login: string
    url: string
  }
  id: string
  description: string
  name: string
  url: string
  issues: Issue
  stargazers: {
    totalCount: number
  }
}

