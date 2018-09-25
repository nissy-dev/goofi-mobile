import * as React from 'react'
import { ActivityIndicator } from 'react-native'
import { Query } from 'react-apollo'
import { Container, H2 } from '../atoms'
import { GOOFI_QUERY, Response, Variables } from '../query'
import I18n from '../locale'
import { GridList } from '../organisms'

class GridListViewQuery extends Query<Response, Variables> {}

interface GridListViewProps {
  language: string
  keyword: string
  navigate: (pass: string, param: { [key: string]: any }) => void
}

export const GridListViewGQLWrapper: React.SFC<GridListViewProps> = props => {
  const { language, keyword, navigate } = props
  const query = `${keyword} language:${language} good-first-issues:>1 stars:>500`
  return (
    <GridListViewQuery query={GOOFI_QUERY} variables={{ query }}>
      {({ loading, data, error }) => {
        if (loading) {
          return (
            <Container>
              <ActivityIndicator size="large" color="#2ecc71" />
            </Container>
          )
        }
        if (error) {
          return (
            <Container>
              <H2>{error.networkError && I18n.t('networkError')}</H2>
              <H2>
                {error.graphQLErrors.length !== 0 && I18n.t('graphqlError')}
              </H2>
            </Container>
          )
        }
        return (
          <GridList
            navigate={navigate}
            data={data && data.search && data.search.nodes}
          />
        )
      }}
    </GridListViewQuery>
  )
}
