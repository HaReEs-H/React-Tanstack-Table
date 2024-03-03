import { useEffect, useState } from 'react'

function DebouncedInput({
  value: initValue,
  onChange,
  debounce = 500,
  ...props
}) {
  const [value, setValue] = useState(initValue)
  useEffect(() => {
    setValue(initValue)
  }, [initValue])
  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)
    return () => clearTimeout(timeout)
  }, [value, onChange, debounce])
  return (
    <input
      {...props}
      value={value}
      onChange={(event) => {
        setValue(event.target.value)
      }}
    />
  )
}

export default DebouncedInput
