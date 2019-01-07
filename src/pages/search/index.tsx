import * as React from 'react'
import styled from 'styled-components/native'
import { Container } from '../../atoms'
import { SearchHeader, Modal } from '../../organisms'
import { GridListViewGQLWrapper } from '../../utils'
import { PAGE_BACK_GROUND } from '../../../assets'

const SearchPageContainer = styled(Container)`
  background-color: ${PAGE_BACK_GROUND};
`
interface Props {
  navigation: {
    // TODO: 後でFixする
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
      language: 'Javascript',
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
    return (
      <SearchPageContainer>
        <SearchHeader
          language={language}
          keyword={keyword}
          onPressSearchBtn={this.setModalVisible}
        />
        <GridListViewGQLWrapper
          navigate={navigate}
          keyword={keyword}
          language={language}
        />
        <Modal
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
