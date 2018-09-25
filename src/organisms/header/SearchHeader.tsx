import * as React from 'react'
import styled from 'styled-components/native'
import { View } from 'react-native'
import { Container, SearchIcon, TouchableView } from '../../atoms'
import { QueryWord } from '../../molecules'
import { WHITE, BASE_COLOR } from '../../../assets'

const QueryBox = styled(Container)`
  justify-content: flex-start;
  padding-horizontal: 10;
  margin-right: auto;
`

const SearchButton = styled(TouchableView)`
  padding-vertical: 10;
  padding-horizontal: 10;
`

const SearchHeaderContainer = styled(Container)`
  padding-top: 15;
  padding-left: 15;
  padding-right: 20;
  width: 100%;
  height: 80;
  background-color: ${BASE_COLOR};
`

interface Props {
  language: string
  keyword: string
  onPressSearchBtn: () => void
}

const SearchHeader = (props: Props) => {
  const { language, keyword, onPressSearchBtn } = props
  return (
    <SearchHeaderContainer flex={0} row={true}>
      <QueryBox row={true}>
        {keyword && <QueryWord>{keyword}</QueryWord>}
        {language && <QueryWord>{language}</QueryWord>}
      </QueryBox>
      <SearchButton onPress={onPressSearchBtn}>
        <SearchIcon size={20} color={WHITE} />
      </SearchButton>
    </SearchHeaderContainer>
  )
}

export default SearchHeader
