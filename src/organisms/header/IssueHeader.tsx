import * as React from 'react'
import { View, StyleSheet } from 'react-native'
import styled from 'styled-components/native'
import { TouchableView, Heading, ArrowBackIcon } from '../../atoms'
import I18n from '../../locale'

const Header = styled(View)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-top: 30;
  width: 100%;
  height: 80;
  background-color: #2ecc71;
`

const BackButton = styled(TouchableView)`
  margin-left: 10;
  margin-right: auto;
  padding-horizontal: 5;
  padding-vertical: 5;
`

const HeaderTitle = styled(Heading)`
  flex: 1;
  padding-left: 120;
  padding-bottom: 5;
  align-self: center;
`
interface Props {
  navigation: {
    goBack: () => void
  }
}

// custom fontがstyled-componentではうまく読み込めないので一旦この方法でしのぐ
const styles = StyleSheet.create({
  font: {
    fontFamily: 'regular'
  }
})

const IssueHeader = (props: Props) => {
  const { navigation } = props
  return (
    <Header>
      <BackButton onPress={() => navigation.goBack()}>
        <ArrowBackIcon size={32} color={'#ffffff'} />
      </BackButton>
      <HeaderTitle style={styles.font} color={'#ffffff'}>
        {I18n.t('issueListPageTitle')}
      </HeaderTitle>
    </Header>
  )
}

export default IssueHeader
