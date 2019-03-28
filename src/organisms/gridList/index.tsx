import * as React from 'react'
import { FlatList } from 'react-native'
import { RepositoryNode } from '../../query'
import Card from '../card'

interface Props {
  data: RepositoryNode[]
  navigate: (pass: string, param: { [key: string]: any }) => void,
  onLoadMore: () => void,
}

export default class GridList extends React.PureComponent<Props> {
  keyExtractor = (item: RepositoryNode) => `card-${item.id}-${item.name}`

  onPressCard = (item: RepositoryNode) => {
    const { navigate } = this.props
    navigate('issueList', { issues: item.issues })
  }

  renderCard = ({ item, index }: { item: RepositoryNode; index: number }) => {
    return (
      <Card index={index} data={item} onPress={() => this.onPressCard(item)} />
    )
  }

  render() {
    const { data, onLoadMore } = this.props
    return (
      <FlatList
        numColumns={2}
        data={data}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderCard}
        onEndReached={() => onLoadMore()}
      />
    )
  }
}
