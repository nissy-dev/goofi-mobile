import * as React from 'react'
import styled from 'styled-components/native'
import { StarOIcon, StarIcon, TouchableView } from '../../atoms'
import { STAR_COLOR } from '../../../assets'

const TouchableArea = styled(TouchableView)`
  justify-content: center;
  padding-vertical: 10;
  padding-horizontal: 20;
`

interface Props {
  favStatus: boolean
  onPress: () => void
}

const FavoriteButton = (props: Props) => {
  const { favStatus, onPress } = props
  return (
    <TouchableArea testID={'favbtn'} onPress={() => onPress()}>
      {favStatus ? (
        <StarIcon size={30} color={STAR_COLOR} />
      ) : (
        <StarOIcon size={30} color={STAR_COLOR} />
      )}
    </TouchableArea>
  )
}

export default FavoriteButton
