import * as React from 'react'
import { MaterialIcons } from '@expo/vector-icons'

interface Props {
  size: number
  color: string
}

const ArrowUpIcon = (props: Props) => (
  <MaterialIcons name="keyboard-arrow-up" {...props} />
)

export default ArrowUpIcon
