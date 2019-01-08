import * as React from 'react'
import styled from 'styled-components/native'
import { ScrollView, StyleSheet, WebView } from 'react-native'
import Modal from 'react-native-modal'
import { Container } from '../../atoms'
import {
  Loading,
  IssueHeader,
  WebViewHeader,
  IssueListItem
} from '../../organisms'
import { IssueNode } from '../../query'
import { PAGE_BACK_GROUND } from '../../../assets'

const IssueListPageContainer = styled(Container)`
  background-color: ${PAGE_BACK_GROUND};
`

const StyledModal = styled(Modal)`
  flex: 1;
  margin-horizontal: 0;
  margin-vertical: 0;
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
  selectedIssueItem: IssueNode | null
}

export default class IssueListPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      modalVisible: false,
      selectedIssueItem: null
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
    const { selectedIssueItem } = this.state
    const issues = navigation.getParam('issues')
    return (
      <IssueListPageContainer>
        <IssueHeader navigation={navigation} />
        <ScrollView contentContainerStyle={styles.listViewContainerStyle}>
          {issues.nodes.map((item: IssueNode) => (
            <IssueListItem
              key={`issue-${item.updatedAt}`}
              item={item}
              onPress={this.onPressIssue}
            />
          ))}
        </ScrollView>
        <StyledModal
          animationIn={'slideInDown'}
          animationOut={'slideOutUp'}
          isVisible={this.state.modalVisible}
          backdropOpacity={1.0}
        >
          <WebViewHeader
            onPressBackBtn={() =>
              this.setModalVisible(!this.state.modalVisible)
            }
            onPressFavBtn={() => 'fav'}
          />
          <WebView
            startInLoadingState
            renderLoading={() => <Loading />}
            source={{
              uri:
                selectedIssueItem !== null ? selectedIssueItem.url : undefined
            }}
          />
        </StyledModal>
      </IssueListPageContainer>
    )
  }
}
