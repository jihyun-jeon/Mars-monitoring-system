import { useState } from 'react'

// on/off
export const useToggle = (initialState: boolean): [boolean, () => void] => {
  const [isToggled, setIsToggled] = useState(initialState)

  const handleToggled = () => {
    setIsToggled(!isToggled)
    document.body.style.overflow = 'unset'
  }
  return [isToggled, handleToggled]
}
