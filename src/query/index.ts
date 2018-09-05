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
  organization: {
    repositories: Repository
  }
}

export type InputProps = {
  language: string
}

export type Variables = {
  language: string
}

export const query = gql`
  query($language: string) {
    search(
      first: 10
      query: "language: $language good-first-issues:>1 stars:>500"
      type: REPOSITORY
    ) {
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
