import * as React from 'react'
import { FlatList } from 'react-native'
import Card from '../card'
import { RepositoryNode } from '../../types'

interface Props {
  data: RepositoryNode[]
  navigate: (pass: string, param: { [key: string]: any }) => void
  onLoadMore: () => void
  onRefresh: () => void
}

export default function GridList(props: Props) {
  const { data, onLoadMore, onRefresh, navigate } = props

  const keyExtractor = (item: RepositoryNode) => `card-${item.id}-${item.name}`

  const onPressCard = (item: RepositoryNode) => {
    const { navigate } = props
    navigate('issueList', { issues: item.issues })
  }

  const renderCard = ({
    item,
    index
  }: {
    item: RepositoryNode
    index: number
  }) => {
    return <Card index={index} data={item} onPress={() => onPressCard(item)} />
  }

  return (
    <FlatList
      numColumns={2}
      data={data}
      keyExtractor={keyExtractor}
      renderItem={renderCard}
      refreshing={false}
      onRefresh={() => onRefresh()}
      onEndReached={() => onLoadMore()}
    />
  )
}
