import * as React from 'react'
import styled from 'styled-components/native'
import { ScrollView, StyleSheet } from 'react-native'
import { Query } from 'react-apollo'
import { Container } from '../../atoms'
import { IssueHeader, WebViewModal, IssueListItem } from '../../organisms'
import { GET_FAV_ITEMS, IssueNode } from '../../query'
import { PAGE_BACK_GROUND } from '../../../assets'
import { judgeIsFavItem } from '../../utils'

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
    getParam: (val: string) => any
    goBack: () => any
  }
}

interface State {
  modalVisible: boolean
  selectedIssueItem: IssueNode
}

const initialIssueItem = {
  title: '',
  url: '',
  updatedAt: ''
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

  onPressIssue = (item: IssueNode): void => {
    this.setState({ selectedIssueItem: item })
    this.setModalVisible(!this.state.modalVisible)
  }

  render() {
    const { navigation } = this.props
    const { selectedIssueItem, modalVisible } = this.state
    const { nodes } = navigation.getParam('issues')
    return (
      <IssueListPageContainer>
        <IssueHeader navigation={navigation} />
        <ScrollView contentContainerStyle={styles.listViewContainerStyle}>
          {nodes.map((item: IssueNode) => (
            <IssueListItem
              key={`issue-${item.updatedAt}`}
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
              <WebViewModal
                favStatus={favStatus}
                isVisible={modalVisible}
                selectedIssueItem={selectedIssueItem}
                onPressBackBtn={this.setModalVisible}
                onPressFavBtn={() => 'test'}
              />
            )
          }}
        </Query>
      </IssueListPageContainer>
    )
  }
}
