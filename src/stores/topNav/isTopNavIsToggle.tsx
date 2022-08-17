import { observable } from 'mobx'

const isTopNavIsToggle = observable({
  _isAlarmMessageToggle: false,
  _isAlarmLoadingToggle: true,
  _isCheckLogout: false,

  get isAlarmMessageToggle() {
    return this._isAlarmMessageToggle
  },

  get isAlarmLoadingToggle() {
    return this._isAlarmLoadingToggle
  },

  get isCheckLogout() {
    return this._isCheckLogout
  },

  setIsAlarmMessageToggle(value: boolean) {
    return (this._isAlarmMessageToggle = value)
  },

  setIsAlarmLoadingToggle(value: boolean) {
    return (this._isAlarmLoadingToggle = value)
  },

  setIsCheckLogout(value: boolean) {
    return (this._isCheckLogout = value)
  },
})

export { isTopNavIsToggle }
