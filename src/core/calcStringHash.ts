import { FlexStyle } from 'react-native'

const getStyleString = (layout: FlexStyle) => {
  const {
    width = 'auto',
    height = 'auto',
    flex = 0,
    flexDirection = 'column',
    padding = 0,
    margin = 0,
    alignContent = 'flex-start',
    alignItems = 'stretch',
    alignSelf = 'auto',
    justifyContent = 'flex-start',
    flexWrap = 'no-wrap',
    overflow = 'visible'
  } = layout

  const {
    marginHorizontal = margin,
    marginVertical = margin,
    paddingHorizontal = padding,
    paddingVertical = padding
  } = layout

  const {
    flexGrow = flex,
    flexShrink = flex,
    // should be just 0 but chrome does percents too
    flexBasis = flex ? '0%' : 'auto',

    marginTop = marginVertical,
    marginBottom = marginVertical,
    marginLeft = marginHorizontal,
    marginRight = marginHorizontal,

    paddingTop = paddingVertical,
    paddingBottom = paddingVertical,
    paddingLeft = paddingHorizontal,
    paddingRight = paddingHorizontal
  } = layout

  return JSON.stringify([
    width,
    height,
    flex,
    flexDirection,
    padding,
    margin,
    alignContent,
    alignItems,
    alignSelf,
    justifyContent,
    flexWrap,
    overflow,
    marginHorizontal,
    marginVertical,
    paddingHorizontal,
    paddingVertical,
    flexGrow,
    flexShrink,
    flexBasis,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight
  ])
}

export const compareWithJson = (a: FlexStyle, b: FlexStyle) =>
  getStyleString(a) === getStyleString(b)
