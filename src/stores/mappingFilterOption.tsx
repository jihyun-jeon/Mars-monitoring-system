import { observable } from 'mobx'

const mappingFilterOption = observable({
  _equipmentType: '',
  _company: '',
  _matchedStatus: '',

  get equipmentType() {
    return this._equipmentType
  },

  get company() {
    return this._company
  },

  get matchedStatus() {
    return this._matchedStatus
  },

  setEquipmentTypeInfo(value: string) {
    return (this._equipmentType = value)
  },

  setCompanyInfo(value: string) {
    return (this._company = value)
  },

  setMatchedStatusInfo(value: string) {
    return (this._matchedStatus = value)
  },
})

export { mappingFilterOption }
