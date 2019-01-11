import * as React from 'react'
import { View } from 'react-native'
import Modal from 'react-native-modal'
import styled from 'styled-components/native'
import { Container, InputBox, Heading } from '../../atoms'
import { ModalCloseButton, SelectiveButton } from '../../molecules'
import I18n from '../../locale'
import { selectItems } from '../../utils'
import { BASE_COLOR, WHITE } from '../../../assets'

const SelectLanguageBox = styled(Container)`
  justify-content: flex-start;
  flex-wrap: wrap;
  padding-horizontal: 10;
`

const KeyWordBox = styled(InputBox)`
  height: 30;
  opacity: 0.5;
  background-color: ${WHITE};
`

const FormFieldTitleBox = styled(View)`
  padding-vertical: 10;
`

const StyledModal = styled(Modal)`
  flex-direction: column;
  justify-content: flex-start;
  height: 100;
  margin-top: 80;
  margin-bottom: 270;
  padding-horizontal: 30;
  padding-vertical: 30;
  border-radius: 30;
  background-color: ${BASE_COLOR};
`

interface Props {
  isVisible: boolean
  keyword: string
  language: string
  switchModalVisible: () => void
  setLanguage: (value: string) => void
  setKeyword: (value: string) => void
}

const SearchForm = (props: Props) => {
  const {
    isVisible,
    keyword,
    language,
    switchModalVisible,
    setLanguage,
    setKeyword
  } = props
  return (
    <StyledModal
      animationIn={'slideInDown'}
      animationOut={'slideOutUp'}
      backdropOpacity={0.7}
      isVisible={isVisible}
      swipeDirection={'up'}
      onSwipe={() => switchModalVisible()}
    >
      <FormFieldTitleBox>
        <Heading size={18} color={WHITE}>
          {I18n.t('selectLanguage')}
        </Heading>
      </FormFieldTitleBox>
      <SelectLanguageBox row={true}>
        {selectItems.map(val => {
          const key = Object.keys(val)[0]
          const isSelected = val[key] === language
          return (
            <SelectiveButton
              key={`item-${key}`}
              label={val[key]}
              selected={isSelected}
              onPress={setLanguage}
            />
          )
        })}
      </SelectLanguageBox>
      <FormFieldTitleBox>
        <Heading size={18} color={WHITE}>
          {I18n.t('keywordForm')}
        </Heading>
      </FormFieldTitleBox>
      <KeyWordBox
        autoCapitalize={'none'}
        onChangeText={(text: string) => setKeyword(text)}
        value={keyword}
      />
      <ModalCloseButton onPress={switchModalVisible} />
    </StyledModal>
  )
}

export default SearchForm
