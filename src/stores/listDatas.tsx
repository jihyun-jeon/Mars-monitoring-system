import { observable } from 'mobx'

const listDatas = observable({
  _equipmentListData: [],
  _deviceListData: [],
  _adminHistoryListData: [],
  _isLoading: true,

  get equipmentListData() {
    return this._equipmentListData
  },

  get deviceListData() {
    return this._deviceListData
  },

  get adminHistoryListData() {
    return this._adminHistoryListData
  },

  get isLoading() {
    return this._isLoading
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

  setIsLoading(value: boolean) {
    return (this._isLoading = value)
  },
})

export { listDatas }
