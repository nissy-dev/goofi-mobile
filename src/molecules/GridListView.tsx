import * as React from 'react'
import {
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet
} from 'react-native'
import styled from 'styled-components/native'
import { Query } from 'react-apollo'
import { Container, H2, Image, StarIcon } from '../atoms'
import { GOOFI_QUERY, Response, Variables, RepositoryNode } from '../query'

const styles = StyleSheet.create({
  listViewContainerStyle: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    backgroundColor: '#F5F5F5'
  },
  font: {
    fontFamily: 'regular'
  },
  boldFont: {
    fontFamily: 'bold'
  }
})

const Card = styled(TouchableOpacity)`
  flex-direction: column;
  margin-horizontal: 10;
  margin-vertical: 10;
  padding-vertical: 10;
  padding-horizontal: 10;
  width: 157;
  height: 250;
  border-radius: 5;
  background-color: #ffffff;
  box-shadow: 0 2px 3px #ccc;
`

const CardImage = styled(Image)`
  align-self: center;
  border-radius: 10;
`

const IssueLabel = styled(View)`
  position: relative;
  width: 70%;
  height: 30;
  justify-content: center;
  align-items: center;
  border-radius: 10;
  margin-top: auto;
  margin-bottom: 10;
  background-color: #2ecc71;
`

const IssueText = styled(H2)`
  color: #ffffff;
`

const Content = styled(Container)``

const StarLabel = styled(H2)`
  padding-vertical: 10;
  margin-left: auto;
`

const Subtitle = styled(H2)`
  padding-top: 5;
  font-size: 18;
`

class GridListViewQuery extends Query<Response, Variables> {}

interface GridListViewProps {
  language: string
  keyword: string
  navigate: any
}

export const GridListViewGQLWrapper: React.SFC<GridListViewProps> = props => {
  const { language, keyword, navigate } = props
  const query = `${keyword} language:${language} good-first-issues:>1 stars:>500`
  return (
    <GridListViewQuery query={GOOFI_QUERY} variables={{ query }}>
      {({ loading, data, error }) => {
        if (loading) {
          return (
            <Container>
              <ActivityIndicator size="large" color="#2ecc71" />
            </Container>
          )
        }
        if (error) {
          return (
            <Container>
              <H2>{error.networkError && 'Network Error'}</H2>
              <H2>{error.graphQLErrors.length !== 0 && 'GraphQL Error'}</H2>
            </Container>
          )
        }

        // null処理はutilsでやらせる, issueなしの表示切り替えを含めて
        // FlatListでリファクタ
        return (
          <ScrollView contentContainerStyle={styles.listViewContainerStyle}>
            {data &&
            data.search &&
            data.search.nodes &&
            data.search.nodes.length !== 0
              ? data.search.nodes.map((val: RepositoryNode) => (
                  <Card
                    onPress={() =>
                      navigate('issueList', { issues: val.issues })
                    }
                    key={`card-${val.id}`}
                  >
                    <CardImage
                      source={{ uri: val.owner.avatarUrl }}
                      style={{ width: 100, height: 100 }}
                    />
                    <Content>
                      <Subtitle style={styles.boldFont}>{val.name}</Subtitle>
                      <StarLabel style={styles.font}>
                        <StarIcon color={'#FFDF00'} size={15} />
                        {`  ${val.stargazers.totalCount}`}
                      </StarLabel>
                      <IssueLabel>
                        <IssueText style={styles.font}>{`${
                          val.issues.totalCount
                        } Issues`}</IssueText>
                      </IssueLabel>
                    </Content>
                  </Card>
                ))
              : 'No Data'}
          </ScrollView>
        )
      }}
    </GridListViewQuery>
  )
}
