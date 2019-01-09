import * as React from 'react'
import styled from 'styled-components/native'
import { ScrollView, StyleSheet } from 'react-native'
import { Query, Mutation } from 'react-apollo'
import { Container } from '../../atoms'
import { FavoriteHeader, WebViewModal, FavoriteListItem } from '../../organisms'
import {
  GET_FAV_ITEMS,
  ADD_FAV_ITEM,
  IssueNode,
  DELETE_FAV_ITEM
} from '../../query'
import { PAGE_BACK_GROUND } from '../../../assets'
import { judgeIsFavItem } from '../../utils'
import { IssueItem } from '../../apollo/resolvers'

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

interface State {
  modalVisible: boolean
  selectedFavItem: IssueItem
}

const initialIssueItem = {
  id: 0,
  title: '',
  url: '',
  avatarUrl: ''
}

export default class FavoritePage extends React.Component<void, State> {
  constructor() {
    super()
    this.state = {
      modalVisible: false,
      selectedFavItem: initialIssueItem
    }
  }

  setModalVisible = (visible: boolean): void => {
    this.setState({ modalVisible: visible })
  }

  onPressIssue = (item: IssueItem): void => {
    this.setState({ selectedFavItem: item })
    this.setModalVisible(!this.state.modalVisible)
  }

  render() {
    const { selectedFavItem, modalVisible } = this.state
    return (
      <FavoritePageContainer>
        <FavoriteHeader />
        <ScrollView contentContainerStyle={styles.listViewContainerStyle}>
          <Query query={GET_FAV_ITEMS}>
            {({ data }) => {
              const { favItems } = data
              return favItems.map((item: IssueItem) => (
                <FavoriteListItem
                  key={`issue-${item.id}`}
                  item={item}
                  onPress={this.onPressIssue}
                />
              ))
            }}
          </Query>
        </ScrollView>
        <Query query={GET_FAV_ITEMS}>
          {({ data }) => {
            const { favItems } = data
            const favStatus =
              favItems && judgeIsFavItem(selectedFavItem, favItems)
            const { title, url, avatarUrl } = selectedFavItem
            return (
              <Mutation
                mutation={favStatus ? DELETE_FAV_ITEM : ADD_FAV_ITEM}
                variables={{ title, url, avatarUrl }}
              >
                {mutate => (
                  <WebViewModal
                    favStatus={favStatus}
                    isVisible={modalVisible}
                    selectedIssueItem={selectedFavItem}
                    onPressBackBtn={this.setModalVisible}
                    onPressFavBtn={mutate}
                  />
                )}
              </Mutation>
            )
          }}
        </Query>
      </FavoritePageContainer>
    )
  }
}
