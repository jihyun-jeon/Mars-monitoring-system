import { observable } from 'mobx'

interface deviceDetailDataType {
  deviceData: null | DeviceData
  deviceRepairData: null | DeviceRepairData[]
  deviceInstallData: null | DeviceInstallData[]
  deviceReplaceData: null | DeviceReplaceData[]

  setDeviceData: (data: DeviceData) => void
  setDeviceRepairData: (data: DeviceRepairData[]) => void
  setDeviceInstallData: (data: DeviceInstallData[]) => void
  setDeviceReplaceData: (data: DeviceReplaceData[]) => void
}

const deviceDetailData = observable<deviceDetailDataType>({
  deviceData: null,
  deviceRepairData: null,
  deviceInstallData: null,
  deviceReplaceData: null,

  setDeviceData(data) {
    this.deviceData = data
  },

  setDeviceRepairData(data) {
    this.deviceRepairData = data
  },

  setDeviceInstallData(data) {
    this.deviceInstallData = data
  },

  setDeviceReplaceData(data) {
    this.deviceReplaceData = data
  },
})

export { deviceDetailData }

export interface DeviceOtherInfo {
  status: string
  lastUpdateTime: Date
  error: string
  statellitesUsed: number
  lowBattery: string
  latitude: string
  longitude: string
}

export interface MatchedEquipment {
  matchedEquipmentOriginalId: string
  matchedEquipmentCategory: string
}

export interface DeviceData {
  id: number
  serialNumber: string
  qrCode: string
  company: string
  device_other_info: DeviceOtherInfo[]
  matchedEquipment: MatchedEquipment[]
}

export interface EquipmentGpsTracker {
  serial_number: string
}

export interface DeviceRepairData {
  id: number
  repaired_sort_content: string
  repaired_manager_name: string
  equipment_gps_tracker: EquipmentGpsTracker[]
  repaired_purpose_content: string
  content: string
  date: Date
}

export interface DeviceInstallData {
  id: number
  lastUpdateTime: Date
  deviceSerialNumber: string
  equipmentSerialNumber: string
  matchedUserId: string
  matchedStatus: boolean
}

export interface EquipmentGpsTracker2 {
  serial_number: string
}

export interface DeviceReplaceData {
  id: number
  date: Date
  repaired_manager_name: string
  equipment_gps_tracker: EquipmentGpsTracker2[]
  battery: string
  lastLogTime: Date
}
