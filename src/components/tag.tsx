import { Badge } from './badge'

const colors: Array<'red' | 'yellow' | 'green' | 'lime' | 'sky' | 'indigo' | 'purple' | 'pink'> = [
  'red',
  'yellow',
  'green',
  'lime',
  'sky',
  'indigo',
  'purple',
  'pink',
]

const stringToColor = (
  string: string
):
  | 'red'
  | 'orange'
  | 'amber'
  | 'yellow'
  | 'lime'
  | 'green'
  | 'emerald'
  | 'teal'
  | 'cyan'
  | 'sky'
  | 'blue'
  | 'indigo'
  | 'violet'
  | 'purple'
  | 'fuchsia'
  | 'pink'
  | 'rose'
  | 'zinc'
  | undefined => {
  let seed = 0
  for (let i = 0; i < string.length; i++) {
    seed = string.charCodeAt(i) + ((seed << 5) - seed)
  }
  const index = Math.abs(seed) % colors.length
  return colors[index]
}

export function Tag({ tag }: { tag: string }) {
  const color = stringToColor(tag)
  return <Badge color={color}>{tag}</Badge>
}
