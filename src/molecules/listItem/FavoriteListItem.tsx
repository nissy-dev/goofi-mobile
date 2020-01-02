import * as React from 'react'
import { Animated } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import styled from 'styled-components/native'

import { Heading } from '../../atoms'
import IssueListItem from './IssueListItem'
import { FAV_DELETE_BTN_COLOR, WHITE } from '../../../assets'

import { useMutation, DELETE_FAV_ITEM } from '../../apollo'
import { IssueItem } from '../../types'
import I18n from '../../locale'

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
}

export default function FavoriteListItem(props: Props) {
  // ここだけはApolloの依存をRootにできなかったので許容する
  const [deleteFavItem] = useMutation(DELETE_FAV_ITEM, {
    variables: { ...props.item }
  })
  const swipeRef = React.useRef<Swipeable | null>(null);

  const renderRightActions = (
    progressAnimatedValue: Animated.AnimatedInterpolation,
    _: any
  ) => {
    const trans = progressAnimatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [64, 1],
      extrapolate: 'clamp'
    })
    const onPressDeleteBtn = () => {
      deleteFavItem()
      swipeRef.current?.close()
    }

    return (
      <Animated.View style={{ width: 120, transform: [{ translateX: trans }] }}>
        <DeleteButton onPress={() => onPressDeleteBtn()}>
          <Heading color={WHITE}>{I18n.t('delete')}</Heading>
        </DeleteButton>
      </Animated.View>
    )
  }

  return (
    <Swipeable ref={swipeRef} renderRightActions={renderRightActions}>
      <IssueListItem favorite {...props} />
    </Swipeable>
  )
}
