import gql from 'graphql-tag'

export const typeDefs = gql`
  type Query {
    getAllData(language: String!, cursor: String): GoodFirstIssues!
    getFavItems: [FavItem]!
  }

  type Mutation {
    addFavItem(
      id: ID!
      title: String!
      url: String!
      avatarUrl: String!
    ): FavItem
    deleteFavItem(
      id: ID!
      title: String!
      url: String!
      avatarUrl: String!
    ): FavItem
  }

  type GoodFirstIssues {
    pageInfo: PageInfo!
    repositoryCount: Int!
    repositories: [Repository]!
  }

  type PageInfo {
    endCursor: String
    hasNextPage: Boolean!
  }

  type Repository {
    id: ID!
    owner: RepositoryOwner!
    description: String
    name: String!
    url: String!
    stargazerCount: Int!
    issueCount: Int!
    issues: [Issue]!
  }

  type RepositoryOwner {
    id: ID!
    avatarUrl: String!
    login: String!
    url: String!
  }

  type Actor {
    avatarUrl: String!
  }

  type Issue {
    title: String!
    url: String!
    author: Actor
    updatedAt: String!
  }

  type FavItem {
    id: ID!
    title: String!
    url: String!
    avatarUrl: String!
  }
`

export const GET_REPO_ALL_DATA = gql`
  query getAllData($query: String!, $cursor: String) {
    search(first: 10, query: $query, after: $cursor, type: REPOSITORY) {
      repositoryCount
      pageInfo {
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
              id
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
  query getFavItems {
    favItems @client {
      id
      title
      url
      avatarUrl
    }
  }
`

export const ADD_FAV_ITEM = gql`
  mutation addFavItem(
    $id: ID!
    $title: String!
    $url: String!
    $avatarUrl: String!
  ) {
    addFavItem(id: $id, title: $title, url: $url, avatarUrl: $avatarUrl) @client
  }
`

export const DELETE_FAV_ITEM = gql`
  mutation deleteFavItem(
    $id: ID!
    $title: String!
    $url: String!
    $avatarUrl: String!
  ) {
    deleteFavItem(id: $id, title: $title, url: $url, avatarUrl: $avatarUrl)
      @client
  }
`
