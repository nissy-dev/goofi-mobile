/**
 * atomsではなるべく単純なスタイルを心掛ける
 * なるべく汎用性のあるものがここにくる
 */

export * from './headings'
export { default as TouchableView } from './touchable'

export * from './icon'
export * from './label'
export { default as Container } from './container'
export { default as Heading } from './heading'
export { default as Image } from './image'
export { default as InputBox } from './input'

export { Props as ContainerProps } from './container'
export { Props as HeadingProps } from './heading'
export { Props as TouchableViewProps } from './touchable'
