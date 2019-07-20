import React, { useState } from 'react'
import styled from 'styled-components/native'

import { Container } from '../../atoms'
import { Loading } from '../../molecules'
import { SearchHeader, SearchFormModal, GridList } from '../../organisms'
import { PAGE_BACK_GROUND } from '../../../assets'

import { useQuery } from '../../apollo'
import { GET_REPO_ALL_DATA } from '../../query'
import { removeDuplicateItem } from '../../utils'

const SearchPageContainer = styled(Container)`
  background-color: ${PAGE_BACK_GROUND};
`

const updateQuery = (previousResult: any, fetchMoreResult: any): void => {
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

interface Props {
  navigation: {
    navigate: any
  }
}

export default function SearchPage(props: Props) {
  const { navigate } = props.navigation

  const [modalVisible, setModalVisible] = useState(false)
  const [language, setLanguage] = useState('')
  const [keyword, setKeyword] = useState('')

  const languageQuery = language ? 'language:' + language : ''
  const query = `${keyword} ${languageQuery} good-first-issues:>1 stars:>500`
  const { loading, data, error, fetchMore, refetch } = useQuery(
    GET_REPO_ALL_DATA,
    { variables: { query } }
  )

  const onPressSearchBtn = (): void => {
    setModalVisible(!modalVisible)
  }
  return (
    <SearchPageContainer testID="searchPage">
      <SearchHeader
        language={language}
        keyword={keyword}
        onPressSearchBtn={onPressSearchBtn}
      />
      {loading ? (
        <Loading />
      ) : (
        <GridList
          data={data.search.nodes}
          navigate={navigate}
          onRefresh={() => refetch({ query })}
          onLoadMore={() =>
            fetchMore({
              variables: {
                query,
                // @ts-ignore
                cursor: data.search.pageInfo.endCursor
              },
              updateQuery: (previousResult, { fetchMoreResult }) => {
                return updateQuery(previousResult, fetchMoreResult)
              }
            })
          }
        />
      )}
      <SearchFormModal
        isVisible={modalVisible}
        keyword={keyword}
        language={language}
        switchModalVisible={onPressSearchBtn}
        setLanguage={setLanguage}
        setKeyword={setKeyword}
      />
    </SearchPageContainer>
  )
}

SearchPage.navigationOptions = {
  header: null
}
