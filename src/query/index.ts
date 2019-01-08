import gql from 'graphql-tag'

export interface IssueNode {
  title: string
  url: string
  author?: {
    avatarUrl: string
  }
  updatedAt: string
}

export interface Issue {
  totalCount: number
  nodes: Array<IssueNode>
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

export interface Repository {
  repositoryCount: number
  pageInfo: {
    startCursor: string
    endCursor: string
    hasNextPage: boolean
  }
  nodes: Array<RepositoryNode>
}

export const GET_REPO_ALL_DATA = gql`
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
            first: 30
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

export const GET_FAV_ITEMS = gql`
  query GetFavItems {
    favItems @client {
      id
      item
    }
  }
`

export const ADD_FAV_ITEM = gql`
  mutation AddFavItem($item: Item!) {
    addFavItem(item: $item) @client
  }
`
export const DELETE_FAV_ITEM = gql`
  mutation DeleteFavItem($item: Item!) {
    deleteFavItem(item: $item) @client
  }
`
