import { View } from 'react-native'
import styled from 'styled-components/native'
import { WHITE } from '../../../assets'

const Label = styled(View)`
  width: 80;
  height: 30;
  justify-content: center;
  align-items: center;
  border-width: 1;
  border-radius: 10;
  border-color: ${WHITE};
`

export default Label
