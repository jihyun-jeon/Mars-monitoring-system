import { observable } from 'mobx'

const usersInfo = observable({
  _userToken: localStorage.getItem('accessToken'),
  _userName: '',
  _isLocationControl: false,
  _isEquipmentControl: true,
  _inAlarmData: true,

  get userToken() {
    return this._userToken
  },

  get userName() {
    return this._userName
  },

  get isLocationControl() {
    return this._isLocationControl
  },

  get isEquipmentControl() {
    return this._isEquipmentControl
  },

  get isAlarmData() {
    return this._inAlarmData
  },

  removeUserToken() {
    return localStorage.removeItem('accessToken')
  },

  getUserName(name: string) {
    return (this._userName = name)
  },

  getAuthLocation(control: boolean) {
    return (this._isLocationControl = control)
  },

  getAuthEquipment(control: boolean) {
    return (this._isEquipmentControl = control)
  },

  setIsAlarmData(value: boolean) {
    return (this._inAlarmData = value)
  },
})

export { usersInfo }
