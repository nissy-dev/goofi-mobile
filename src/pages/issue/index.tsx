import * as React from 'react'
import styled from 'styled-components/native'
import { ScrollView, StyleSheet, WebView } from 'react-native'
import Modal from 'react-native-modal'
import { Container } from '../../atoms'
import { Loading, IssueHeader, IssueListItem } from '../../organisms'
import { IssueNode } from '../../query'

const IssueListPageContainer = styled(Container)`
  background-color: #f5f5f5;
`

const StyledModal = styled(Modal)`
  flex: 1;
  margin-horizontal: 0;
  margin-vertical: 0;
  background-color: #f5f5f5;
`

// custom fontがstyled-componentではうまく読み込めないので一旦この方法でしのぐ
const styles = StyleSheet.create({
  listViewContainerStyle: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#F5F5F5'
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
  url: string
}

export default class IssueListPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      modalVisible: false,
      url: ''
    }
  }

  setModalVisible = (visible: boolean): void => {
    this.setState({ modalVisible: visible })
  }

  setUrl = (url: string): void => {
    this.setState({ url })
  }

  onPressIssue = (url: string): void => {
    this.setUrl(url)
    this.setModalVisible(!this.state.modalVisible)
  }

  render() {
    const { navigation } = this.props
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
          swipeDirection={'right'}
          backdropOpacity={1.0}
          onSwipe={() => this.setModalVisible(!this.state.modalVisible)}
        >
          <WebView
            startInLoadingState
            renderLoading={() => <Loading />}
            source={{ uri: this.state.url }}
          />
        </StyledModal>
      </IssueListPageContainer>
    )
  }
}
