import * as React from 'react'
import styled from 'styled-components/native'
import { ScrollView, View, StyleSheet } from 'react-native'
import { Container, H1, H2, Image } from '../atoms'
import I18n from '../locale'
import { IssueNode } from '../query'

const Header = styled(View)`
  flex-direction: column;
  align-items: center;
  padding-top: 30;
  width: 100%;
  height: 80;
  background-color: #2ecc71;
`

const Subtitle = styled(H2)``

const IssueTitle = styled(H2)`
  width: 50%;
  flex-wrap: wrap;
`

const ListItem = styled(View)`
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
  flex-direction: column;
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
  }
}

export default class IssueListPage extends React.Component<Props, {}> {
  render() {
    const { navigation } = this.props
    const issues = navigation.getParam('issues')
    return (
      <IssueListPageContainer>
        <Header>
          <H1 style={styles.font} color={'#ffffff'}>
            {I18n.t('issueListPageTitle')}
          </H1>
        </Header>
        {/* <Subtitle>{I18n.t('issueSubTitle')}</Subtitle> */}
        <ScrollView contentContainerStyle={styles.listViewContainerStyle}>
          {issues.nodes.map((item: IssueNode) => (
            <ListItem key={`issue-${item.updatedAt}`}>
              <ListItemImage
                source={{ uri: item.author.avatarUrl }}
                style={{ width: 50, height: 50 }}
              />
              <LabelArea>
                <IssueTitle style={styles.font}>{item.title}</IssueTitle>
              </LabelArea>
            </ListItem>
          ))}
        </ScrollView>
      </IssueListPageContainer>
    )
  }
}
