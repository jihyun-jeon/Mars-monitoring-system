import { observable } from 'mobx'

const pathNumbers = observable({
  _equipmentNumber: '',
  _deviceNumber: '',
  _frontPathName: '',
  _midPathName: '',

  get equipmentNumber() {
    return this._equipmentNumber
  },

  get deviceNumber() {
    return this._deviceNumber
  },

  get frontPathName() {
    return this._frontPathName
  },

  get midPathName() {
    return this._midPathName
  },

  setEquipmentNumber(value: string) {
    return (this._equipmentNumber = value)
  },

  setDeviceListNumber(value: string) {
    return (this._deviceNumber = value)
  },

  setFrontPathName(value: string) {
    return (this._frontPathName = value)
  },

  setMidPathName(value: string) {
    return (this._midPathName = value)
  },
})

export { pathNumbers }
