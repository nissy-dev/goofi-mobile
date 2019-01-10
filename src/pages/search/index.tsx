import * as React from 'react'
import styled from 'styled-components/native'
import { Container, Heading } from '../../atoms'
import {
  SearchHeader,
  SearchFormModal,
  Loading,
  GridList
} from '../../organisms'
import { PAGE_BACK_GROUND } from '../../../assets'
import { GET_REPO_ALL_DATA } from '../../query'
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
  constructor(props: any) {
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

  render() {
    const { navigate } = this.props.navigation
    const { modalVisible, language, keyword } = this.state
    const languageQuery = language ? 'language:' + language : ''
    const query = `${keyword} ${languageQuery} good-first-issues:>1 stars:>500`
    return (
      <SearchPageContainer>
        <SearchHeader
          language={language}
          keyword={keyword}
          onPressSearchBtn={this.setModalVisible}
        />
        <Query query={GET_REPO_ALL_DATA} variables={{ query }}>
          {({ loading, data, error }) => {
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
            return <GridList navigate={navigate} data={data.search.nodes} />
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
