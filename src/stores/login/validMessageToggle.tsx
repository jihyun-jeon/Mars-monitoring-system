import { observable } from 'mobx'

const validMessageToggle = observable({
  _isIdValidMessageToggle: false,
  _isPwValidMessageToggle: false,

  get isIdValidMessageToggle() {
    return this._isIdValidMessageToggle
  },

  get isPwValidMessageToggle() {
    return this._isPwValidMessageToggle
  },

  setIsIdValidMessageToggle(value: boolean) {
    return (this._isIdValidMessageToggle = value)
  },

  setIsPwValidMessageToggle(value: boolean) {
    return (this._isPwValidMessageToggle = value)
  },
})

export { validMessageToggle }
