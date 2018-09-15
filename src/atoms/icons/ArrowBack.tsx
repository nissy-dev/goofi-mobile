import * as React from 'react'
import { Ionicons } from '@expo/vector-icons'

interface Props {
  size: number
  color: string
}

const ArrowBackIcon = (props: Props) => (
  <Ionicons name="ios-arrow-back" {...props} />
)

export default ArrowBackIcon
