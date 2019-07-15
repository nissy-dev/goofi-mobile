import * as React from 'react'
import { View } from 'react-native'
import styled from 'styled-components/native'
import { Container } from '../../atoms'
import { QueryWord, SearchButton } from '../../molecules'
import { BASE_COLOR } from '../../../assets'

const QueryBox = styled(Container)`
  justify-content: flex-start;
  padding-horizontal: 10;
  margin-right: auto;
`

const SearchHeaderContainer = styled(View)`
  flex-direction: row;
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
    <SearchHeaderContainer>
      <QueryBox row={true}>
        {!!keyword && <QueryWord>{keyword}</QueryWord>}
        {!!language && <QueryWord>{language}</QueryWord>}
      </QueryBox>
      <SearchButton onPress={() => onPressSearchBtn()} />
    </SearchHeaderContainer>
  )
}

export default SearchHeader
