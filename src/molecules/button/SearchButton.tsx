import * as React from 'react'
import styled from 'styled-components/native'
import { SearchIcon, TouchableView } from '../../atoms'
import { WHITE } from '../../../assets'

const TouchableArea = styled(TouchableView)`
  justify-content: center;
  padding-vertical: 10;
  padding-horizontal: 10;
`

interface Props {
  onPress: () => void
}

const SearchButton = (props: Props) => {
  const { onPress } = props
  return (
    <TouchableArea testID={'search-btn'} onPress={() => onPress()}>
      <SearchIcon size={20} color={WHITE} />
    </TouchableArea>
  )
}

export default SearchButton
