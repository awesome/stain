import { FlexStyle } from 'react-native'
import { compareFlexStyle } from './styleComparer'
import { compareWithJson } from './calcStringHash'

const generateSeq = (count: number, min: number, max: number): number[] =>
  Array.from(
    { length: count },
    () => min + Math.floor(Math.random() * (max + 1 - min))
  )

const margins = [0, 1] // [0, 2, 4] // ...generateSeq(1, 1, 10)]
const allProps = [
  ['width', ['auto', ...generateSeq(1, 0, 2)]],
  ['height', ['auto', ...generateSeq(1, 0, 2)]],
  ['flex', [0, 1]],
  ['flexDirection', ['row', 'column', 'row-reverse', 'column-reverse']],
  ['padding', margins],
  ['margin', margins],
  [
    'alignContent',
    [
      'flex-start',
      'flex-end',
      'center',
      'stretch',
      'space-between',
      'space-around'
    ]
  ],
  ['alignItems', ['flex-start', 'flex-end', 'center', 'stretch', 'baseline']],
  [
    'alignSelf',
    ['auto', 'flex-start', 'flex-end', 'center', 'stretch', 'baseline']
  ],
  [
    'justifyContent',
    [
      'flex-start',
      'flex-end',
      'center',
      'space-between',
      'space-around',
      'space-evenly'
    ]
  ],
  ['flexWrap', ['no-wrap']],
  ['overflow', ['visible']],
  ['marginHorizontal', margins],
  ['marginVertical', margins],
  ['paddingHorizontal', margins],
  ['paddingVertical', margins],
  ['marginTop', margins],
  ['marginBottom', margins],
  ['marginLeft', margins],
  ['marginRight', margins],
  ['paddingTop', margins],
  ['paddingBottom', margins],
  ['paddingLeft', margins],
  ['paddingRight', margins]
]

const generateStyle = (): FlexStyle => {
  let style: FlexStyle = {}

  allProps.forEach(([name, variants]) => {
    if (Math.random() > 0.7) {
      style[name as any] = pickOne(variants as any)
    }
  })
  return style
}

const pickOne = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]

// console.log(JSON.stringify([generateStyle(), generateStyle()]))

const SAMPLE_COUNT = 1000000

const allStyles = Array.from({ length: SAMPLE_COUNT }, () => generateStyle())

console.log('generated styles', allStyles.length)

const styleToCompareWith = generateStyle()

const measureComparer = (
  name: string,
  comp: (a: FlexStyle, b: FlexStyle) => boolean
) => {
  const hrstart = process.hrtime()

  const hits: FlexStyle[] = []
  allStyles.forEach(s => {
    if (comp(s, styleToCompareWith)) hits.push(s)
  })

  const hrend = process.hrtime(hrstart)

  console.log(
    `${name} found ${hits.length} hits. took ${hrend[0]}s, ${hrend[1] /
      1000000}ms `
  )

  //   console.log('   ')
  //   console.log(JSON.stringify(hits))
  //   console.log('   ')
  //   console.log('--------------------')
}

measureComparer('array   ', compareFlexStyle)
measureComparer('json str', compareWithJson)
