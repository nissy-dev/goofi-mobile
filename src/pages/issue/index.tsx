import * as React from 'react'
import styled from 'styled-components/native'
import { ScrollView, View, StyleSheet, WebView } from 'react-native'
import {
  Container,
  TouchableView,
  H1,
  H2,
  Image,
  ArrowBackIcon,
  ArrowForwardIcon
} from '../../atoms'
import I18n from '../../locale'
import { IssueNode } from '../../query'
import Modal from 'react-native-modal'

const Header = styled(View)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-top: 30;
  width: 100%;
  height: 80;
  background-color: #2ecc71;
`

const BackButton = styled(TouchableView)`
  margin-left: 10;
  margin-right: auto;
  padding-horizontal: 5;
  padding-vertical: 5;
`

const HeaderTitle = styled(H1)`
  flex: 1;
  padding-left: 120;
  padding-bottom: 5;
  align-self: center;
`

const IssueTitle = styled(H2)`
  width: 88%;
  flex-wrap: wrap;
  padding-right: 10;
`

const ListItem = styled(TouchableView)`
  flex-direction: row;
  height: 100;
  width: 100%;
  justify-content: flex-start;
  background-color: #ffffff;
  padding-horizontal: 10;
  padding-vertical: 10;
  border-bottom-width: 3;
  border-bottom-color: #f5f5f5;
`

const LabelArea = styled(View)`
  flex-direction: row;
  padding-horizontal: 10;
  padding-vertical: 10;
`

const ListItemImage = styled(Image)`
  align-self: center;
  border-radius: 10;
`

const IssueListPageContainer = styled(Container)`
  background-color: #f5f5f5;
`

const StyledModal = styled(Modal)`
  flex: 1;
  margin-horizontal: 0;
  margin-vertical: 0;
`

const StyledWebView = styled(WebView)`
  flex: 1;
`

const IssueButton = styled(TouchableView)`
  margin-left: 10;
  margin-right: auto;
  padding-horizontal: 5;
  padding-vertical: 5;
`

// custom fontがstyled-componentではうまく読み込めないので一旦この方法でしのぐ
const styles = StyleSheet.create({
  listViewContainerStyle: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#F5F5F5'
  },
  font: {
    fontFamily: 'regular'
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
  constructor(props: any) {
    super(props)
    this.state = {
      modalVisible: false,
      url: ''
    }
  }

  setModalVisible(visible: boolean): void {
    this.setState({ modalVisible: visible })
  }

  setUrl(url: string): void {
    this.setState({ url })
  }

  onPressIssue(url: string): void {
    this.setUrl(url)
    this.setModalVisible(!this.state.modalVisible)
  }

  render() {
    const { navigation } = this.props
    const issues = navigation.getParam('issues')
    return (
      <IssueListPageContainer>
        <Header>
          <BackButton onPress={() => navigation.goBack()}>
            <ArrowBackIcon size={32} color={'#ffffff'} />
          </BackButton>
          <HeaderTitle style={styles.font} color={'#ffffff'}>
            {I18n.t('issueListPageTitle')}
          </HeaderTitle>
        </Header>
        <ScrollView contentContainerStyle={styles.listViewContainerStyle}>
          {issues.nodes.map((item: IssueNode) => (
            <ListItem
              onPress={() => this.onPressIssue(item.url)}
              key={`issue-${item.updatedAt}`}
            >
              <ListItemImage
                source={{ uri: item.author.avatarUrl }}
                style={{ width: 50, height: 50 }}
              />
              <LabelArea>
                <IssueTitle style={styles.font}>{item.title}</IssueTitle>
                <ArrowForwardIcon color={'#bdbdbd'} size={30} />
              </LabelArea>
            </ListItem>
          ))}
        </ScrollView>
        <StyledModal
          animationIn={'slideInDown'}
          animationOut={'slideOutUp'}
          backdropOpacity={0.7}
          isVisible={this.state.modalVisible}
          swipeDirection={'right'}
          onSwipe={() => {
            this.setModalVisible(!this.state.modalVisible)
          }}
        >
          <StyledWebView source={{ uri: this.state.url }} />
        </StyledModal>
      </IssueListPageContainer>
    )
  }
}
