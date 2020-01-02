import React, { useState } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import styled from 'styled-components/native'

import { Container } from '../../atoms'
import { FavoriteListItem } from '../../molecules'
import { FavoriteHeader, WebViewModal } from '../../organisms'
import { PAGE_BACK_GROUND } from '../../../assets'

import { useFavoriteOperation } from '../../hooks'
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
  const onPressIssue = (item: IssueItem): void => {
    setSelectedFavItem(item)
    setModalVisible(!modalVisible)
  }

  const { data, addFavItem, deleteFavItem } = useFavoriteOperation(
    selectedFavItem
  )
  const favStatus = judgeIsFavItem(selectedFavItem, data)
  return (
    <FavoritePageContainer testID="favoritePage">
      <FavoriteHeader />
      <ScrollView contentContainerStyle={styles.listViewContainerStyle}>
        {data?.favItems.map((item: IssueItem, index: number) => (
          <FavoriteListItem
            key={`fav-${index}`}
            index={index}
            item={item}
            onPress={onPressIssue}
          />
        ))}
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
