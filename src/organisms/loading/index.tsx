import * as React from 'react'
import { ActivityIndicator } from 'react-native'
import { Container } from '../../atoms'
import { BASE_COLOR } from '../../../assets'

const Loading = () => (
  <Container>
    <ActivityIndicator size="large" color={BASE_COLOR} />
  </Container>
)

export default Loading
