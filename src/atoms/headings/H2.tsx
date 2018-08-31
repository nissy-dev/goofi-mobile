import styled from 'styled-components/native'

const H2 = styled.Text`
  color: ${props => props.color}
  font-size: 15px;
`

H2.defaultProps = {
  color: '#2c3e50'
}

export default H2
