import { observable } from 'mobx'

const listDatas = observable({
  _equipmentListData: [],
  _deviceListData: [],
  _adminHistoryListData: [],
  _adminMappingEquipmentListData: [],
  _adminMappingDeviceListData: [],
  _alarmData: [],

  get equipmentListData() {
    return this._equipmentListData
  },

  get deviceListData() {
    return this._deviceListData
  },

  get adminHistoryListData() {
    return this._adminHistoryListData
  },

  get adminMappingEquipmentListData() {
    return this._adminMappingEquipmentListData
  },

  get adminMappingDeviceListData() {
    return this._adminMappingDeviceListData
  },

  get alarmData() {
    return this._alarmData
  },

  setEquipmentListData(value: []) {
    return (this._equipmentListData = value)
  },

  setDeviceListData(value: []) {
    return (this._deviceListData = value)
  },

  setAdminHistoryData(value: []) {
    return (this._adminHistoryListData = value)
  },

  setAdminMappingEquipmentListData(value: []) {
    return (this._adminMappingEquipmentListData = value)
  },

  setAdminMappingDeviceListData(value: []) {
    return (this._adminMappingDeviceListData = value)
  },

  setAlarmData(value: []) {
    return (this._alarmData = value)
  },
})

export { listDatas }
