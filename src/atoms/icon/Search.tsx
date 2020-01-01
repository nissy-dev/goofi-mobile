import * as React from 'react'
import { FontAwesome } from '@expo/vector-icons'

interface Props {
  size: number
  color?: string
}

const SearchIcon = (props: Props) => <FontAwesome name="search" {...props} />

export default SearchIcon
