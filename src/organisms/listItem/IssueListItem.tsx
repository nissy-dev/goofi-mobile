import * as React from 'react'
import { View, StyleSheet } from 'react-native'
import styled from 'styled-components/native'
import { TouchableView, Heading, ArrowForwardIcon, Image } from '../../atoms'
import { IssueNode } from '../../query'

const IssueTitle = styled(Heading)`
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

// custom fontがstyled-componentではうまく読み込めないので一旦この方法でしのぐ
const styles = StyleSheet.create({
  font: {
    fontFamily: 'regular'
  }
})

interface Props {
  item: IssueNode
  onPress: (url: string) => void
}

const IssueListItem = (props: Props) => {
  const { onPress, item } = props
  return (
    <ListItem onPress={() => onPress(item.url)} key={`issue-${item.updatedAt}`}>
      <ListItemImage
        source={{ uri: item.author.avatarUrl }}
        style={{ width: 50, height: 50 }}
      />
      <LabelArea>
        <IssueTitle style={styles.font}>{item.title}</IssueTitle>
        <ArrowForwardIcon color={'#bdbdbd'} size={30} />
      </LabelArea>
    </ListItem>
  )
}

export default IssueListItem
