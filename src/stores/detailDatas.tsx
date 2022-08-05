import { observable } from 'mobx'

interface DetailDatas {
  equipment: null | Equipment
  setEquipment: (data: Equipment) => void
}

const detailDatas = observable<DetailDatas>({
  equipment: null,

  setEquipment(data: Equipment) {
    this.equipment = data
  },
})

export { detailDatas }

interface Company {
  id: number
  name: string
}

interface Unit {
  id: number
  name: string
}

interface EquipmentType {
  id: number
  name: string
}

interface EquipmentCategory {
  id: number
  name: string
  imageUrl: string
}

interface Sort {
  id: number
  content: string
}

interface Manager {
  id: number
  name: string
  company: string
}

interface RepairedPurpose {
  id: number
  content: string
}

interface RepairedHistory {
  sort: Sort
  manager: Manager
  repairedPurpose: RepairedPurpose
  date: Date
  content: string
}

interface Manager2 {
  id: number
  name: string
}

interface Company2 {
  id: number
  name: string
}

interface MatchedHistory {
  id: number
  lastLogTime: Date
  serialNumber: string
  manager: Manager2
  company: Company2
}

interface Driver {
  name: string
  level: string
  driverCompany: string
}

interface Manager3 {
  id: number
  name: string
}

interface Company3 {
  id: number
  name: string
}

interface Device {
  id: number
  battery: string
  lastLogTime: Date
  longitude: string
  latitude: string
  serialNumber: string
  manager: Manager3
  company: Company3
}

interface Equipment {
  id: number
  company: Company
  maintenance_company: string
  maintenance_manager_name: string
  maintenance_manager_phone_number: string
  maintenance_manager_department: string
  unit: Unit
  capacity: number
  equipmentType: EquipmentType
  equipmentCategory: EquipmentCategory
  repaired_history: RepairedHistory[]
  matched_history: MatchedHistory[]
  driver: Driver[]
  device: Device[]
  plateNumber: string
  manufactureDate: Date
  qr_code: string
  isPower: boolean
  originalId: string
}
