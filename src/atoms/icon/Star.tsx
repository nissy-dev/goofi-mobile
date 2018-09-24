import * as React from 'react'
import { FontAwesome } from '@expo/vector-icons'

interface Props {
  size: number
  color: string
}

const StarIcon = (props: Props) => <FontAwesome name="star" {...props} />

export default StarIcon
