import * as React from 'react'
import styled from 'styled-components/native'
import { View, StyleSheet } from 'react-native'
import { Container, H1 } from '../../atoms'
import I18n from '../../locale'

const Header = styled(View)`
  flex-direction: column;
  align-items: center;
  padding-top: 30;
  width: 100%;
  height: 80;
  background-color: #2ecc71;
`

// custom fontがstyled-componentではうまく読み込めないので一旦この方法でしのぐ
const styles = StyleSheet.create({
  font: {
    fontFamily: 'regular'
  }
})

interface Props {
  data: any
}

export default class FavoritePage extends React.Component<Props, {}> {
  render() {
    return (
      <Container>
        <Header>
          <H1 style={styles.font} color={'#ffffff'}>
            {I18n.t('favorite')}
          </H1>
        </Header>
        <Container />
      </Container>
    )
  }
}
