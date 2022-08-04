import { observable } from 'mobx'

const usersInfo = observable({
  _userName: '',
  _isLocationControl: false,
  _isEquipmentControl: true,

  get userName() {
    return this._userName
  },

  get isLocationControl() {
    return this._isLocationControl
  },

  get isEquipmentControl() {
    return this._isEquipmentControl
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
})

export { usersInfo }
