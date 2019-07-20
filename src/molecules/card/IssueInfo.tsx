import * as React from 'react'
import { Heading, ColoredLabel } from '../../atoms'
import { WHITE } from '../../../assets'

interface Props {
  count: number
}

const IssueInfo: React.FC<Props> = props => (
  <ColoredLabel width={100}>
    <Heading bold size={15} color={WHITE}>
      {`${props.count.toString()} Issues`}
    </Heading>
  </ColoredLabel>
)

export default IssueInfo
