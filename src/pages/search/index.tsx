import * as React from 'react'
import styled from 'styled-components/native'
import { Container, Heading } from '../../atoms'
import { Loading } from '../../molecules'
import { SearchHeader, SearchFormModal, GridList } from '../../organisms'
import { PAGE_BACK_GROUND } from '../../../assets'
import { GET_REPO_ALL_DATA } from '../../query'
import { removeDuplicateItem } from '../../utils'
import I18n from '../../locale'
import { Query } from '../../apollo'

const SearchPageContainer = styled(Container)`
  background-color: ${PAGE_BACK_GROUND};
`
interface Props {
  navigation: {
    navigate: any
  }
}

interface State {
  modalVisible: boolean
  language: string
  keyword: string
}

export default class SearchPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      modalVisible: false,
      language: '',
      keyword: ''
    }
  }

  setModalVisible = (): void => {
    this.setState({ modalVisible: !this.state.modalVisible })
  }

  setLanguage = (value: string): void => {
    this.setState({ language: value })
  }

  setKeyword = (value: string): void => {
    this.setState({ keyword: value })
  }

  updateQuery = (previousResult: any, fetchMoreResult: any): void => {
    const prevRepoList = previousResult.search
    const newRepoList = fetchMoreResult.search
    // workaround: FlatlistのonEndReached Eventが発火しすぎる問題を回避する
    const newNodes = removeDuplicateItem(
      [...prevRepoList.nodes, ...newRepoList.nodes],
      'id'
    )
    const newPageInfo = {
      ...newRepoList.pageInfo,
      hasNextPage: newNodes.length + 10 <= 50
    }

    return newNodes.length && prevRepoList.pageInfo.hasNextPage
      ? {
          search: {
            __typename: prevRepoList.__typename,
            nodes: newNodes,
            pageInfo: newPageInfo
          }
        }
      : previousResult
  }

  render() {
    const { navigate } = this.props.navigation
    const { modalVisible, language, keyword } = this.state
    const languageQuery = language ? 'language:' + language : ''
    const query = `${keyword} ${languageQuery} good-first-issues:>1 stars:>500`
    return (
      <SearchPageContainer testID="searchPage">
        <SearchHeader
          language={language}
          keyword={keyword}
          onPressSearchBtn={this.setModalVisible}
        />
        <Query query={GET_REPO_ALL_DATA} variables={{ query }}>
          {({
            loading,
            data: { search: repoList },
            error,
            fetchMore,
            refetch
          }) => {
            if (loading) {
              return <Loading />
            }
            if (error) {
              return (
                <Container>
                  <Heading>
                    {error.networkError && I18n.t('networkError')}
                  </Heading>
                  <Heading>
                    {error.graphQLErrors.length !== 0 && I18n.t('graphqlError')}
                  </Heading>
                </Container>
              )
            }
            return (
              <GridList
                data={repoList.nodes}
                navigate={navigate}
                onRefresh={() => refetch({ query })}
                onLoadMore={() =>
                  fetchMore({
                    variables: {
                      query,
                      cursor: repoList.pageInfo.endCursor
                    },
                    updateQuery: (previousResult, { fetchMoreResult }) => {
                      return this.updateQuery(previousResult, fetchMoreResult)
                    }
                  })
                }
              />
            )
          }}
        </Query>
        <SearchFormModal
          isVisible={modalVisible}
          keyword={keyword}
          language={language}
          switchModalVisible={this.setModalVisible}
          setLanguage={this.setLanguage}
          setKeyword={this.setKeyword}
        />
      </SearchPageContainer>
    )
  }
}
