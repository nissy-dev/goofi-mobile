import * as React from 'react'
import { FontAwesome } from '@expo/vector-icons'

interface Props {
  size: number
  color?: string
}

const StarIcon = (props: Props) => <FontAwesome name="star-o" {...props} />

export default StarIcon
