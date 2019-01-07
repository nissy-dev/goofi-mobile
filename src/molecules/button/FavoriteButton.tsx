import * as React from 'react'
import styled from 'styled-components/native'
import { StarIcon, TouchableView } from '../../atoms'
import { STAR_COLOR } from '../../../assets'

const TouchableArea = styled(TouchableView)`
  justify-content: center;
  padding-vertical: 10;
  padding-horizontal: 10;
`

interface Props {
  onPress: () => void
}

const FavoriteButton = (props: Props) => {
  const { onPress } = props
  return (
    <TouchableArea onPress={() => onPress()}>
      <StarIcon size={20} color={STAR_COLOR} />
    </TouchableArea>
  )
}

export default FavoriteButton
