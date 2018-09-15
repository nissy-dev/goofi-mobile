import * as React from 'react'
import { Ionicons } from '@expo/vector-icons'

interface Props {
  size: number
  color: string
}

const ArrowForwardIcon = (props: Props) => (
  <Ionicons name="ios-arrow-forward" {...props} />
)

export default ArrowForwardIcon
