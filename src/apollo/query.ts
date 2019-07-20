import gql from 'graphql-tag'

export const GET_REPO_ALL_DATA = gql`
  query($query: String!, $cursor: String) {
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
  query GetFavItems {
    favItems @client {
      id
      title
      url
      avatarUrl
    }
  }
`

export const ADD_FAV_ITEM = gql`
  mutation AddFavItem(
    $id: String!
    $title: String!
    $url: String!
    $avatarUrl: String!
  ) {
    addFavItem(id: $id, title: $title, url: $url, avatarUrl: $avatarUrl) @client
  }
`

export const DELETE_FAV_ITEM = gql`
  mutation DeleteFavItem(
    $id: String!
    $title: String!
    $url: String!
    $avatarUrl: String!
  ) {
    deleteFavItem(id: $id, title: $title, url: $url, avatarUrl: $avatarUrl)
      @client
  }
`
