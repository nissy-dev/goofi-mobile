import React, { useState } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import styled from 'styled-components/native'

import { Container } from '../../atoms'
import { FavoriteListItem } from '../../molecules'
import { FavoriteHeader, WebViewModal } from '../../organisms'
import { PAGE_BACK_GROUND } from '../../../assets'

import {
  useQuery,
  useMutation,
  GET_FAV_ITEMS,
  ADD_FAV_ITEM,
  DELETE_FAV_ITEM
} from '../../apollo'
import { judgeIsFavItem } from '../../utils'
import { IssueItem } from '../../types'

const FavoritePageContainer = styled(Container)`
  background-color: ${PAGE_BACK_GROUND};
`

const styles = StyleSheet.create({
  listViewContainerStyle: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: PAGE_BACK_GROUND
  }
})

const initialIssueItem = {
  id: '',
  title: '',
  url: '',
  avatarUrl: ''
}

export default function FavoritePage() {
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedFavItem, setSelectedFavItem] = useState<IssueItem>(
    initialIssueItem
  )
  const { data } = useQuery<{ favItems: IssueItem[] }>(GET_FAV_ITEMS)
  const [addFavItem] = useMutation(ADD_FAV_ITEM, {
    variables: { ...selectedFavItem }
  })
  const [deleteFavItem] = useMutation(DELETE_FAV_ITEM, {
    variables: { ...selectedFavItem }
  })

  const onPressIssue = (item: IssueItem): void => {
    setSelectedFavItem(item)
    setModalVisible(!modalVisible)
  }

  const favStatus = judgeIsFavItem(selectedFavItem, data)
  return (
    <FavoritePageContainer testID="favoritePage">
      <FavoriteHeader />
      <ScrollView contentContainerStyle={styles.listViewContainerStyle}>
        {data
          ? data.favItems.map((item: IssueItem, index: number) => (
              <FavoriteListItem
                key={`fav-${index}`}
                index={index}
                item={item}
                onPress={onPressIssue}
                onPressDelteBtn={() => deleteFavItem()}
              />
            ))
          : null}
      </ScrollView>
      <WebViewModal
        favStatus={favStatus}
        isVisible={modalVisible}
        selectedIssueItem={selectedFavItem}
        onPressBackBtn={setModalVisible}
        onPressFavBtn={favStatus ? deleteFavItem : addFavItem}
      />
    </FavoritePageContainer>
  )
}
