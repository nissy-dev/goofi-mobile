import * as React from 'react'
import { FlatList } from 'react-native'
import { RepositoryNode } from '../../query'
import Card from '../card'

interface Props {
  data: RepositoryNode
  navigate: (pass: string, param: { [key: string]: any }) => void
}

export default class GridList extends React.PureComponent<Props> {
  keyExtractor = (item: RepositoryNode) => `card-${item.id}`

  onPressCard = (item: RepositoryNode) => {
    const { navigate } = this.props
    navigate('issueList', { issues: item.issues })
  }

  renderCard = ({ item }: { item: RepositoryNode }) => {
    return <Card data={item} onPress={() => this.onPressCard(item)} />
  }

  render() {
    return (
      <FlatList
        numColumns={2}
        data={this.props.data}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderCard}
      />
    )
  }
}
