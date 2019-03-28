import * as React from 'react'
import styled from 'styled-components/native'
import {
  TouchableView,
  Heading,
  HeadingProps,
  TouchableViewProps
} from '../../atoms'
import { WHITE, SELECTED_COLOR } from '../../../assets'

type Selected = {
  selected?: boolean
}

const SelectiveItem = styled<HeadingProps & Selected>(Heading)`
  ${props => (props.selected ? 'font-weight: bold;' : '')};
`

const SelectiveArea = styled<TouchableViewProps & Selected>(TouchableView)`
  margin-vertical: 5;
  margin-horizontal: 5;
  padding-horizontal: 20;
  padding-vertical: 5;
  border-radius: 10;
  border-color: ${WHITE};
  border-width: 1;
  ${props =>
    props.selected
      ? `background-color: ${SELECTED_COLOR}; border-width: 0;`
      : ''};
`

interface Props {
  label: string
  selected: boolean
  onPress: (value: string) => void
}

const SelectiveButton = (props: Props) => {
  const { label, selected, onPress } = props
  return (
    // @ts-ignore: props don't consider testID
    <SelectiveArea
      testID={`select-lang-btn-${label}`}
      selected={selected}
      onPress={selected ? () => onPress('') : () => onPress(label)}
    >
      <SelectiveItem size={15} selected={selected} color={WHITE}>
        {label}
      </SelectiveItem>
    </SelectiveArea>
  )
}

export default SelectiveButton
