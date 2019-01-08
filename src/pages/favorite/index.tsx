import * as React from 'react'
import { Container } from '../../atoms'
import { FavoriteHeader } from '../../organisms'

export default class FavoritePage extends React.Component<{}, {}> {
  render() {
    return (
      <Container>
        <FavoriteHeader />
        <Container />
      </Container>
    )
  }
}
