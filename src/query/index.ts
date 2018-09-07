import gql from 'graphql-tag'

export type IssueNode = {
  title: string
  url: string
  author: {
    avatarUrl: string
  }
  updatedAt: string
}

export type Issue = {
  totalCount: number
  nodes: Array<IssueNode>
}

export type RepositoryNode = {
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

export type Repository = {
  repositoryCount: number
  pageInfo: {
    startCursor: string
    endCursor: string
    hasNextPage: boolean
  }
  nodes: Array<RepositoryNode>
}

export type Response = {
  search: Repository
}

export type Variables = {
  query: string
}

export const GOOFI_QUERY = gql`
  query($query: String!) {
    search(first: 30, query: $query, type: REPOSITORY) {
      repositoryCount
      pageInfo {
        startCursor
        endCursor
        hasNextPage
      }
      nodes {
        ... on Repository {
          owner {
            id
            avatarUrl
            login
            url
          }
          id
          description
          name
          url
          issues(
            first: 20
            labels: ["good first issue"]
            states: OPEN
            orderBy: { field: UPDATED_AT, direction: DESC }
          ) {
            totalCount
            nodes {
              title
              url
              author {
                avatarUrl
              }
              updatedAt
            }
          }
          stargazers {
            totalCount
          }
        }
      }
    }
  }
`
