import * as React from 'react'
import { FontAwesome } from '@expo/vector-icons'

interface Props {
  size: number
  color: string
}

const CloseIcon = (props: Props) => <FontAwesome name="close" {...props} />

export default CloseIcon
