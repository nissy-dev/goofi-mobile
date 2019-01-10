import * as React from 'react'
import styled from 'styled-components/native'
import { ScrollView, StyleSheet } from 'react-native'
import { Container } from '../../atoms'
import { IssueHeader, WebViewModal, IssueListItem } from '../../organisms'
import { GET_FAV_ITEMS, ADD_FAV_ITEM, DELETE_FAV_ITEM } from '../../query'
import { PAGE_BACK_GROUND } from '../../../assets'
import { judgeIsFavItem, createIssueItems } from '../../utils'
import { Query, Mutation, IssueItem } from '../../apollo'

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

interface State {
  modalVisible: boolean
  selectedIssueItem: IssueItem
}

const initialIssueItem = {
  id: '',
  title: '',
  url: '',
  avatarUrl: ''
}

export default class IssueListPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      modalVisible: false,
      selectedIssueItem: initialIssueItem
    }
  }

  setModalVisible = (visible: boolean): void => {
    this.setState({ modalVisible: visible })
  }

  onPressIssue = (item: IssueItem): void => {
    this.setState({ selectedIssueItem: item })
    this.setModalVisible(!this.state.modalVisible)
  }

  render() {
    const { navigation } = this.props
    const { selectedIssueItem, modalVisible } = this.state
    const { nodes } = navigation.getParam('issues')
    const issueItems = createIssueItems(nodes)
    return (
      <IssueListPageContainer>
        <IssueHeader navigation={navigation} />
        <ScrollView contentContainerStyle={styles.listViewContainerStyle}>
          {issueItems.map(item => (
            <IssueListItem
              key={`issue-${item.id}`}
              item={item}
              onPress={this.onPressIssue}
            />
          ))}
        </ScrollView>
        <Query query={GET_FAV_ITEMS}>
          {({ data }) => {
            const { favItems } = data
            const favStatus =
              favItems && judgeIsFavItem(selectedIssueItem, favItems)
            return (
              <Mutation
                mutation={favStatus ? DELETE_FAV_ITEM : ADD_FAV_ITEM}
                variables={{ ...selectedIssueItem }}
              >
                {mutate => (
                  <WebViewModal
                    favStatus={favStatus}
                    isVisible={modalVisible}
                    selectedIssueItem={selectedIssueItem}
                    onPressBackBtn={this.setModalVisible}
                    onPressFavBtn={mutate}
                  />
                )}
              </Mutation>
            )
          }}
        </Query>
      </IssueListPageContainer>
    )
  }
}
