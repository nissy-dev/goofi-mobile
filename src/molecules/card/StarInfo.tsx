import * as React from 'react'
import { View } from 'react-native'
import styled from 'styled-components'
import { Heading, StarIcon } from '../../atoms'
import { STAR_COLOR } from '../../../assets'

interface Props {
  count: number
}

const StarContainer = styled(View)`
  flex-direction: row;
  align-items: center;
`

const StarCount = styled(View)`
  padding-horizontal: 10;
`

const StarInfo: React.FC<Props> = props => (
  <StarContainer>
    <StarIcon color={STAR_COLOR} size={15} />
    <StarCount>
      <Heading size={18}>{props.count.toString()}</Heading>
    </StarCount>
  </StarContainer>
)

export default StarInfo
