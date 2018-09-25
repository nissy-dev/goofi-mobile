import * as React from 'react'
import styled from 'styled-components/native'
import { Label, Heading } from '../../atoms'
import { WHITE } from '../../../assets'

const StyledLabel = styled(Label)`
  margin-horizontal: 5;
  padding-horizontal: 10;
  padding-vertical: 5;
`

interface Props {
  children: string
}

const QueryWord = (props: Props) => {
  const { children } = props
  return (
    <StyledLabel>
      <Heading size={18} color={WHITE}>
        {children}
      </Heading>
    </StyledLabel>
  )
}

export default QueryWord
