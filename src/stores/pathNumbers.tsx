import { observable } from 'mobx'
const pathNumbers = observable({
  _equipmentNumber: '',
  _deviceNumber: '',

  get equipmentNumber() {
    return this._equipmentNumber
  },

  get deviceNumber() {
    return this._deviceNumber
  },

  setEquipmentNumber(value: string) {
    return (this._equipmentNumber = value)
  },

  setDeviceListNumber(value: string) {
    return (this._deviceNumber = value)
  },
})

export { pathNumbers }
