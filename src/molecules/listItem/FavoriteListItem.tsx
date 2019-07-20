import * as React from 'react'
import { Animated } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import styled from 'styled-components/native'

import { Heading } from '../../atoms'
import IssueListItem from './IssueListItem'
import { IssueItem } from '../../types'
import I18n from '../../locale'
import { FAV_DELETE_BTN_COLOR, WHITE } from '../../../assets'

const DeleteButton = styled(RectButton)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${FAV_DELETE_BTN_COLOR};
`

interface Props {
  index: number
  item: IssueItem
  onPress: (item: IssueItem) => void
  onPressDelteBtn: () => void
}

export default class FavoriteListItem extends React.Component<Props> {
  renderRightActions = (progress: any) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [64, 1],
      extrapolate: 'clamp'
    })
    const pressHandler = () => {
      this.props.onPressDelteBtn()
    }

    return (
      <Animated.View style={{ width: 120, transform: [{ translateX: trans }] }}>
        <DeleteButton onPress={() => pressHandler()}>
          <Heading color={WHITE}>{I18n.t('delete')}</Heading>
        </DeleteButton>
      </Animated.View>
    )
  }

  render() {
    const { onPressDelteBtn, ...otherProps } = this.props
    return (
      <Swipeable friction={1} renderRightActions={this.renderRightActions}>
        <IssueListItem favorite {...otherProps} />
      </Swipeable>
    )
  }
}
