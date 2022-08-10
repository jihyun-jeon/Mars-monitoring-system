import { observable } from 'mobx'

const addItemToggle = observable({
  _isEquipmentAddModal: false,
  _isDeviceAddModal: false,

  get isEquipmentAddModal() {
    return this._isEquipmentAddModal
  },

  get isDeviceAddModal() {
    return this._isDeviceAddModal
  },

  setIsEquipmentAddModal(value: boolean) {
    return (this._isEquipmentAddModal = value)
  },

  setIsDeviceAddModal(value: boolean) {
    return (this._isDeviceAddModal = value)
  },
})

export { addItemToggle }
