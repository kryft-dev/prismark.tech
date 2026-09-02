import { palette } from '@prismark/theme'
import { useCallback, useRef, useState } from 'react'
import { Pressable, Text, TextInput, View } from 'react-native'

export const CODE_LENGTH = 6
const SLOTS = Array.from({ length: CODE_LENGTH }, (_, index) => index)

type Props = {
  value: string
  onChange: (code: string) => void
}

// Six boxes drawn over one invisible input, so the keyboard, paste, and
// one-time-code autofill all keep working.
export function CodeInput({ value, onChange }: Props) {
  const input = useRef<TextInput>(null)
  const [focused, setFocused] = useState(false)

  const focus = useCallback(() => input.current?.focus(), [])
  const handleFocus = useCallback(() => setFocused(true), [])
  const handleBlur = useCallback(() => setFocused(false), [])
  const handleChange = useCallback(
    (text: string) => onChange(text.replaceAll(/\D/g, '').slice(0, CODE_LENGTH)),
    [onChange],
  )

  const active = Math.min(value.length, CODE_LENGTH - 1)

  return (
    <Pressable
      onPress={focus}
      accessibilityRole="none"
      accessibilityLabel="Six-digit code"
      className="mt-5 flex-row gap-2"
    >
      {SLOTS.map((index) => (
        <View
          key={index}
          className={`h-13 w-11 items-center justify-center rounded-lg border ${
            focused && index === active ? 'border-foreground' : 'border-input'
          }`}
        >
          <Text className="text-[22px] text-foreground">{value.charAt(index)}</Text>
        </View>
      ))}
      <TextInput
        ref={input}
        value={value}
        onChangeText={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        maxLength={CODE_LENGTH}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        autoComplete="one-time-code"
        keyboardAppearance="dark"
        selectionColor={palette.text}
        autoFocus
        caretHidden
        className="absolute h-px w-px opacity-0"
      />
    </Pressable>
  )
}
