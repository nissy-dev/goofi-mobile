import styled from 'styled-components/native'
import { BASE_COLOR } from '../../../assets'

type Props = {
  width?: number
  height?: number
  color?: string
}

const ColoredLabel = styled.View<Props>`
  width: ${props => props.width};
  height: ${props => props.height};
  justify-content: center;
  align-items: center;
  border-radius: 10;
  background-color: ${props => props.color};
`

ColoredLabel.defaultProps = {
  width: 80,
  height: 30,
  color: BASE_COLOR
}

export default ColoredLabel
