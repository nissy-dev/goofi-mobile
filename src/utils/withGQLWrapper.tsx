import * as React from 'react'
import { Query } from 'react-apollo'
import { Container, Heading } from '../atoms'
import { GOOFI_QUERY, Response, Variables } from '../query'
import { GridList, Loading } from '../organisms'
import I18n from '../locale'

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
          return <Loading />
        }
        if (error) {
          return (
            <Container>
              <Heading>{error.networkError && I18n.t('networkError')}</Heading>
              <Heading>
                {error.graphQLErrors.length !== 0 && I18n.t('graphqlError')}
              </Heading>
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
