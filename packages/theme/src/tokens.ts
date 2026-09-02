// The palette from DESIGN.md. Change it there first, then here.
export const palette = {
  bg: '#0A0A0A',
  ground: '#000000',
  hover: '#161616',
  selected: '#1F1F1F',
  line: '#262626',
  line2: '#333333',
  rule: '#1A1A1A',
  text: '#EDEDED',
  text2: '#A1A1A1',
  text3: '#7D7D7D',
  blue: '#52A8FF',
  green: '#3DD68C',
  amber: '#F5A623',
  red: '#FF6166',
} as const

// Semantic names. The first block is the set shadcn components expect, mapped onto the
// palette. The second block is what DESIGN.md talks about that shadcn has no word for.
export const colors = {
  background: palette.bg,
  foreground: palette.text,
  card: palette.bg,
  'card-foreground': palette.text,
  popover: palette.bg,
  'popover-foreground': palette.text,
  primary: palette.text,
  'primary-foreground': palette.bg,
  secondary: palette.selected,
  'secondary-foreground': palette.text,
  muted: palette.hover,
  'muted-foreground': palette.text2,
  accent: palette.selected,
  'accent-foreground': palette.text,
  destructive: palette.red,
  border: palette.line,
  input: palette.line2,
  ring: palette.text3,
  'chart-1': palette.text,
  'chart-2': palette.text2,
  'chart-3': palette.text3,
  'chart-4': palette.line2,
  'chart-5': palette.line,
  sidebar: palette.bg,
  'sidebar-foreground': palette.text,
  'sidebar-primary': palette.text,
  'sidebar-primary-foreground': palette.bg,
  'sidebar-accent': palette.selected,
  'sidebar-accent-foreground': palette.text,
  'sidebar-border': palette.line,
  'sidebar-ring': palette.text3,

  ground: palette.ground,
  hover: palette.hover,
  selected: palette.selected,
  line: palette.line,
  'line-2': palette.line2,
  rule: palette.rule,
  'foreground-2': palette.text2,
  'foreground-3': palette.text3,
  info: palette.blue,
  success: palette.green,
  warning: palette.amber,
  danger: palette.red,
} as const

// Pixels. DESIGN.md: 6px on controls and rows. The rest follow shadcn's ratios, rounded.
export const radius = {
  DEFAULT: 6,
  sm: 4,
  md: 5,
  lg: 6,
  xl: 8,
  '2xl': 11,
  '3xl': 13,
  '4xl': 16,
} as const

export type ColorName = keyof typeof colors
export type RadiusName = keyof typeof radius
