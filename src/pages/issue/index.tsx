import React, { useState } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import styled from 'styled-components/native'

import { Container } from '../../atoms'
import { IssueListItem } from '../../molecules'
import { IssueHeader, WebViewModal } from '../../organisms'
import { PAGE_BACK_GROUND } from '../../../assets'

import { useFavoriteOperation } from '../../hooks'
import { createIssueItems, judgeIsFavItem } from '../../utils'
import { IssueItem } from '../../types'

const IssueListPageContainer = styled(Container)`
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

interface Props {
  navigation: {
    getParam: (key: string) => any
    goBack: () => any
  }
}

const initialIssueItem = {
  id: '',
  title: '',
  url: '',
  avatarUrl: ''
}

export default function IssueListPage(props: Props) {
  const { navigation } = props

  const [modalVisible, setModalVisible] = useState(false)
  const [selectedIssueItem, setSelectedIssueItem] = useState<IssueItem>(
    initialIssueItem
  )
  const onPressIssue = (item: IssueItem): void => {
    setSelectedIssueItem(item)
    setModalVisible(!modalVisible)
  }

  const { data, addFavItem, deleteFavItem } = useFavoriteOperation(selectedIssueItem)
  const favStatus = judgeIsFavItem(selectedIssueItem, data)
  const { nodes } = navigation.getParam('issues')
  const issueItems = createIssueItems(nodes)
  return (
    <IssueListPageContainer testID="issueListPage">
      <IssueHeader onPressGoBack={navigation.goBack} />
      <ScrollView contentContainerStyle={styles.listViewContainerStyle}>
        {issueItems.map((item, index) => (
          <IssueListItem
            key={`issue-${item.id}`}
            index={index}
            item={item}
            onPress={onPressIssue}
          />
        ))}
      </ScrollView>
      <WebViewModal
        favStatus={favStatus}
        isVisible={modalVisible}
        selectedIssueItem={selectedIssueItem}
        onPressBackBtn={setModalVisible}
        onPressFavBtn={favStatus ? deleteFavItem : addFavItem}
      />
    </IssueListPageContainer>
  )
}
