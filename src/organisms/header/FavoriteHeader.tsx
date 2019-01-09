import * as React from 'react'
import { View, StyleSheet } from 'react-native'
import styled from 'styled-components/native'
import { Heading } from '../../atoms'
import I18n from '../../locale'
import { BASE_COLOR, WHITE } from '../../../assets'

const Header = styled(View)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-top: 30;
  width: 100%;
  height: 80;
  background-color: ${BASE_COLOR};
`

// custom fontがstyled-componentではうまく読み込めないので一旦この方法でしのぐ
const styles = StyleSheet.create({
  font: {
    fontFamily: 'regular'
  }
})

const FavoriteHeader = () => {
  return (
    <Header>
      <Heading size={25} color={WHITE} style={styles.font}>
        {I18n.t('favorite')}
      </Heading>
    </Header>
  )
}

export default FavoriteHeader
