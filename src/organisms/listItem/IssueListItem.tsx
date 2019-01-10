import * as React from 'react'
import { View, StyleSheet } from 'react-native'
import styled from 'styled-components/native'
import { TouchableView, Heading, Image } from '../../atoms'
import { WHITE, PAGE_BACK_GROUND } from '../../../assets'
import { IssueItem } from '../../apollo'

const IssueTitle = styled(Heading)`
  width: 90%;
  flex-wrap: wrap;
`

const ListItem = styled(TouchableView)`
  flex-direction: row;
  height: 100;
  width: 100%;
  justify-content: flex-start;
  background-color: ${WHITE};
  padding-horizontal: 10;
  padding-vertical: 10;
  border-bottom-width: 3;
  border-bottom-color: ${PAGE_BACK_GROUND};
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
  item: IssueItem
  onPress: (item: IssueItem) => void
}

const IssueListItem = (props: Props) => {
  const { onPress, item } = props
  return (
    <ListItem onPress={() => onPress(item)} key={`issue-${item.id}`}>
      <ListItemImage
        source={{ uri: item.avatarUrl }}
        style={{ width: 50, height: 50 }}
      />
      <LabelArea>
        <IssueTitle size={15} style={styles.font}>
          {item.title}
        </IssueTitle>
      </LabelArea>
    </ListItem>
  )
}

export default IssueListItem
