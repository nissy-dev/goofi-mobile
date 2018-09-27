import * as React from 'react'
import styled from 'styled-components/native'
import { View } from 'react-native'
import { Container, Heading } from '../../atoms'
import I18n from '../../locale'
import { WHITE } from '../../../assets'

const Header = styled(View)`
  flex-direction: column;
  align-items: center;
  padding-top: 30;
  width: 100%;
  height: 80;
  background-color: #2ecc71;
`

interface Props {
  data: any
}

export default class FavoritePage extends React.Component<Props, {}> {
  render() {
    return (
      <Container>
        <Header>
          <Heading size={18} color={WHITE}>
            {I18n.t('favorite')}
          </Heading>
        </Header>
        <Container />
      </Container>
    )
  }
}
