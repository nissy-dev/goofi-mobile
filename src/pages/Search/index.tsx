import * as React from 'react'
import { View, StyleSheet } from 'react-native'
import Modal from 'react-native-modal'
import styled from 'styled-components/native'
import {
  Container,
  InputBox,
  ArrowUpIcon,
  TouchableView,
  H2
} from '../../atoms'
import { SearchHeader } from '../../organisms'
import selectItems from '../../utils/createSelectItems'
import I18n from '../../locale'
import { GridListViewGQLWrapper } from '../../utils/withGQLWrapper'

const LanguageWord = styled<{ selected: boolean; color: string }>(H2)`
  ${props =>
    props.selected
      ? `
          font-weight: bold;
        `
      : ''};
`

const SelectLanguageArea = styled(Container)`
  justify-content: flex-start;
  flex-direction: row;
  flex-wrap: wrap;
  padding-horizontal: 10;
`

interface LanguageButtonProps {
  selected: boolean
  onPress: () => void
}

const LanguageButton = styled<LanguageButtonProps>(TouchableView)`
  margin-vertical: 5;
  margin-horizontal: 5;
  padding-horizontal: 20;
  padding-vertical: 5;
  border-radius: 10;
  border-color: #ffffff;
  border-width: 1;
  ${props =>
    props.selected
      ? `
           background-color: #7fc89d;
           border-width: 0;
        `
      : ''};
`

const KeyWordBox = styled(InputBox)`
  height: 30;
  padding-horizontal: 10;
  opacity: 0.5;
  background-color: #ffffff;
`

const ItemTitle = styled(H2)`
  padding-vertical: 10;
`

const ModalCloseButton = styled(TouchableView)`
  margin-top: 20;
  border-radius: 20;
  border-width: 1;
  border-color: #ffffff;
`

const SearchPageContainer = styled(Container)`
  background-color: #f5f5f5;
`

const StyledModal = styled(Modal)`
  height: 100;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 80;
  margin-bottom: 270;
  padding-horizontal: 30
  padding-vertical: 30
  border-radius: 30;
  background-color: #2ecc71;
`

const styles = StyleSheet.create({
  font: {
    fontFamily: 'regular'
  }
})

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
      language: 'Javascript',
      keyword: ''
    }
  }

  setModalVisible(): void {
    this.setState({ modalVisible: !this.state.modalVisible })
  }

  setLanguageValue(value: string): void {
    this.setState({ language: value })
  }

  setKeyword(value: string): void {
    this.setState({ keyword: value })
  }

  render() {
    const { navigate } = this.props.navigation
    const { language, keyword } = this.state
    return (
      <SearchPageContainer>
        <SearchHeader
          language={language}
          keyword={keyword}
          onPressSearchBtn={() => this.setModalVisible()}
        />
        <GridListViewGQLWrapper
          navigate={navigate}
          keyword={keyword}
          language={language}
        />
        <StyledModal
          animationIn={'slideInDown'}
          animationOut={'slideOutUp'}
          backdropOpacity={0.7}
          isVisible={this.state.modalVisible}
          swipeDirection={'up'}
          onSwipe={() => this.setModalVisible()}
        >
          <ItemTitle style={styles.font} color={'#ffffff'}>
            {I18n.t('selectLanguage')}
          </ItemTitle>
          <SelectLanguageArea>
            {selectItems.map(val => {
              // 要リファクタ
              const key = Object.keys(val)[0]
              const isSelected = val[key] === this.state.language
              return (
                <LanguageButton
                  selected={isSelected}
                  onPress={() => this.setLanguageValue(val[key])}
                  key={`item-${key}`}
                >
                  <LanguageWord selected={isSelected} color={'#ffffff'}>
                    {val[key]}
                  </LanguageWord>
                </LanguageButton>
              )
            })}
          </SelectLanguageArea>
          <ItemTitle style={styles.font} color={'#ffffff'}>
            {I18n.t('keywordForm')}
          </ItemTitle>
          <KeyWordBox
            onChangeText={(text: string) => this.setKeyword(text)}
            value={this.state.keyword}
          />
          <ModalCloseButton onPress={() => this.setModalVisible()}>
            <ArrowUpIcon color={'#ffffff'} size={40} />
          </ModalCloseButton>
        </StyledModal>
      </SearchPageContainer>
    )
  }
}
