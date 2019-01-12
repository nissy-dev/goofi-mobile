import * as React from 'react'
import { View } from 'react-native'
import styled from 'styled-components/native'
import { TouchableView, ArrowUpIcon } from '../../atoms'
import { FavoriteButton } from '../../molecules'
import { BASE_COLOR, PAGE_BACK_GROUND } from '../../../assets'

const Header = styled(View)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-top: 30;
  width: 100%;
  height: 80;
  background-color: ${PAGE_BACK_GROUND};
`

const BackButton = styled(TouchableView)`
  margin-left: 10;
  margin-right: auto;
  padding-horizontal: 5;
  padding-vertical: 5;
`

interface Props {
  favStatus: boolean
  onPressBackBtn: () => void
  onPressFavBtn: () => void
}

const WebViewHeader = (props: Props) => {
  const { favStatus, onPressBackBtn, onPressFavBtn } = props
  return (
    <Header testID={'WebViewHeader'}>
      <BackButton
        testID={'webivew-modal-close-btn'}
        onPress={() => onPressBackBtn()}
      >
        <ArrowUpIcon size={40} color={BASE_COLOR} />
      </BackButton>
      <FavoriteButton favStatus={favStatus} onPress={() => onPressFavBtn()} />
    </Header>
  )
}

export default WebViewHeader
