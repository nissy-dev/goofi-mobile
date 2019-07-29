import * as React from 'react'
import { ActivityIndicator } from 'react-native'
import styled from 'styled-components/native'
import { Container } from '../../atoms'
import { BASE_COLOR } from '../../../assets'

const LoadingContainer = styled(Container)`
  justify-content: center;
`

const Loading: React.FC = () => (
  <LoadingContainer>
    <ActivityIndicator size="large" color={BASE_COLOR} />
  </LoadingContainer>
)

export default Loading
