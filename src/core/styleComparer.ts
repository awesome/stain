import { FlexStyle } from '../react/react-native-types'

type PropGetter = <K extends keyof FlexStyle>(s: FlexStyle) => FlexStyle[K]

// paddingHorizontal = padding,
// paddingVertical = padding

type GetterWithFallback = [PropGetter, PropGetter[]]

const allProps: GetterWithFallback[] = [
  [s => s.width, [_ => 'auto']],
  [s => s.height, [_ => 'auto']],
  [s => s.flex, [_ => 0]],
  [s => s.flexDirection, [_ => 'column']],
  [s => s.padding, [_ => 0]],
  [s => s.margin, [_ => 0]],
  [s => s.alignContent, [_ => 'flex-start']],
  [s => s.alignItems, [_ => 'stretch']],
  [s => s.alignSelf, [_ => 'auto']],
  [s => s.justifyContent, [_ => 'flex-start']],
  [s => s.flexWrap, [_ => 'no-wrap']],
  [s => s.overflow, [_ => 'visible']],
  [s => s.marginHorizontal, [s => s.margin, _ => 0]],
  [s => s.marginVertical, [s => s.margin, _ => 0]],
  [s => s.paddingHorizontal, [s => s.padding, _ => 0]],
  [s => s.paddingVertical, [s => s.padding, _ => 0]],
  [s => s.flexGrow, [s => s.flex, _ => 0]],
  [s => s.flexShrink, [s => s.flex, _ => 0]],
  [s => s.flexBasis, [s => (s.flex ? '0%' : 'auto')]],
  [s => s.marginTop, [s => s.marginVertical, s => s.margin, _ => 0]],
  [s => s.marginBottom, [s => s.marginVertical, s => s.margin, _ => 0]],
  [s => s.marginLeft, [s => s.marginHorizontal, s => s.margin, _ => 0]],
  [s => s.marginRight, [s => s.marginHorizontal, s => s.margin, _ => 0]],
  [s => s.paddingTop, [s => s.paddingVertical, s => s.padding, _ => 0]],
  [s => s.paddingBottom, [s => s.paddingVertical, s => s.padding, _ => 0]],
  [s => s.paddingLeft, [s => s.paddingHorizontal, s => s.padding, _ => 0]],
  [s => s.paddingRight, [s => s.paddingHorizontal, s => s.padding, _ => 0]]
]

const getProp = (getter: GetterWithFallback, s: FlexStyle) => {
  let prop = getter[0](s)
  if (prop !== undefined) {
    return prop
  }

  const fallback = getter[1]

  for (let i = 0; i < fallback.length; i++) {
    prop = fallback[i](s)
    if (prop !== undefined) {
      return prop
    }
  }

  return undefined
}

export const compareFlexStyle = (a: FlexStyle, b: FlexStyle): boolean => {
  for (let i = 0; i < allProps.length; i++) {
    const getter = allProps[i]
    if (getProp(getter, a) !== getProp(getter, b)) {
      return false
    }
  }

  return true
}
