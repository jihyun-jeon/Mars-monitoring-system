import { observable } from 'mobx'

const isSideNavToggle = observable({
  _isArrowToggle: false,
  _isEquipmentDropDown: false,
  _isDeviceDropDown: false,
  _isAdminDropDown: false,

  get isArrowToggle() {
    return this._isArrowToggle
  },

  get isEquipmentDropDown() {
    return this._isEquipmentDropDown
  },

  get isDeviceDropDown() {
    return this._isDeviceDropDown
  },

  get isAdminDropDown() {
    return this._isAdminDropDown
  },

  setIsArrowToggle(value: boolean) {
    return (this._isArrowToggle = value)
  },

  setIsEquipmentDropDown(value: boolean) {
    return (this._isEquipmentDropDown = value)
  },

  setIsDeviceDropDown(value: boolean) {
    return (this._isDeviceDropDown = value)
  },

  setIsAdminDropDown(value: boolean) {
    return (this._isAdminDropDown = value)
  },
})

export { isSideNavToggle }
