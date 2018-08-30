import styled from 'styled-components/native'

const H1 = styled.Text`
  color: ${props => props.color}
  font-size: 25px;
`

H1.defaultProps = {
  color: '#2c3e50'
}

export default H1
