import styled from 'styled-components/native'

export interface Props {
  row?: boolean
  onPress?: () => void
}

const TouchableView = styled.TouchableOpacity<Props>`
  flex-direction: ${props => (props.row ? 'row' : 'column')};
  align-items: center;
`
TouchableView.defaultProps = {
  row: false
}

export default TouchableView
