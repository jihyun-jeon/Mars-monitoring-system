import { observable } from 'mobx'

const pwVisibilityToggle = observable({
  _pwVisibility: false,
  _pwType: 'password',

  get pwVisibility() {
    return this._pwVisibility
  },

  get pwType() {
    return this._pwType
  },

  setPwVisibility() {
    return !this._pwVisibility
  },

  setPwType(value: string) {
    return (this._pwType = value)
  },
})

export { pwVisibilityToggle }
