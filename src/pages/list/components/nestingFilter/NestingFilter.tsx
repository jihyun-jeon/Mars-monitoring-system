import axios from 'axios'
import { toJS } from 'mobx'
import { observer } from 'mobx-react'
import { useState, useEffect, Dispatch, SetStateAction } from 'react'

import {
  EQUIPMENT_LIST_ADDRESS,
  DEVICE_LIST_ADDRESS,
  ADMIN_HISTORY_ADDRESS,
} from '../../../../config'
import useStore from '../../../../useStore'
import adminOptionData from '../data/adminOptionData'
import deviceOptionData from '../data/deviceOptionData'
import equipmentOptionData from '../data/equipmentOptionData'

type Props = {
  pathName: string
  setIsLoading: Dispatch<SetStateAction<boolean>>
}

const NestingFilter = observer(({ pathName, setIsLoading }: Props) => {
  const pathCheckerOptionData: any = () => {
    switch (pathName) {
      case 'equipmentList':
        return equipmentOptionData
      case 'deviceList':
        return deviceOptionData
      case 'adminHistory':
        return adminOptionData
    }
  }

  const [searchInfo, setSearchInfo] = useState({
    EquipmentType: '',
    DeviceStatus: '',
    Battery: '',
    ActiveStatus: '',
    statusBattery: 'lowBattery',
  })

  const { EquipmentType, DeviceStatus, Battery, ActiveStatus, statusBattery } = searchInfo

  const handleUserSelector = (e: any) => {
    const { value, name } = e.target
    switch (name) {
      case 'EquipmentType':
        setSearchInfo((data) => ({ ...data, [name]: value }))
        break
      case 'DeviceStatus':
        setSearchInfo((data) => ({ ...data, [name]: value }))
        break
      case 'Battery':
        setSearchInfo((data) => ({ ...data, [name]: value }))
        break
      case 'ActiveStatus':
        setSearchInfo((data) => ({ ...data, [name]: value }))
        break
      case 'statusBattery':
        setSearchInfo((data) => ({ ...data, [name]: value }))
        break
    }
  }

  const collectiveQuery = {
    equipment: EquipmentType && `type_id=[${EquipmentType}]`.concat('&'),
    device: DeviceStatus && `status_id=[${DeviceStatus}]`.concat('&'),
    battery: Battery && `battery=20`.concat('&'),
    activeStatus: ActiveStatus && `is_power=${ActiveStatus}`.concat('&'),
    lowBattery: statusBattery,
  }

  const { equipment, device, battery, activeStatus, lowBattery } = collectiveQuery

  const { listDatas } = useStore()

  const requestToServerSearch = async () => {
    const equipmentQueryAddress =
      `${EQUIPMENT_LIST_ADDRESS}equipment/list?${equipment}${device}${battery}${activeStatus}`.slice(
        0,
        -1,
      )
    const deviceQueryAddress = `${DEVICE_LIST_ADDRESS}device/list?order=${lowBattery}`
    const adminHistoryAddress = `${ADMIN_HISTORY_ADDRESS}/equipment/match`
    let response
    try {
      switch (pathName) {
        case 'equipmentList':
          response = await axios.get('/data/equipmentList.json')
          // response = await axios.get(equipmentQueryAddress)
          listDatas.setEquipmentListData(response.data)
          break
        case 'deviceList':
          response = await axios.get('/data/deviceList.json')
          // response = await axios.get(deviceQueryAddress)
          listDatas.setDeviceListData(response.data)
          break
        case 'adminHistory':
          response = await axios.get('/data/adminHistory.json')
          // response = await axios.get(adminHistoryAddress)
          listDatas.setAdminHistoryData(response.data)
          break
      }
      setIsLoading(false)
    } catch (err) {
      alert(err)
    }
  }

  const [resetItem, setResetItem] = useState(false)

  const resetSearchInfo = () => {
    setResetItem(true)
    requestToServerSearch()
  }

  useEffect(() => {
    requestToServerSearch()
  }, [])

  return (
    <>
      <h2 className="mb-2 text-2xl font-semibold text-black">{pathCheckerOptionData()[0].title}</h2>
      <div className="mb-8 flex flex-col rounded border border-textDisabled bg-bgPaper py-4 px-12">
        <div className="mb-4 flex justify-center">
          {pathCheckerOptionData().map((data: any, idx: number) => (
            <div className="mr-12" key={idx}>
              <h3 className="mb-1 block text-sm font-semibold text-gray-900 dark:text-gray-400">
                {data.name}
              </h3>
              <select
                name={data.name}
                onChange={handleUserSelector}
                className="block w-52 rounded border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              >
                {data.option.map((el: any, idx: number) => (
                  <option value={el.queryTitle} key={idx}>
                    {
                      {
                        equipmentList: resetItem ? 'All' : el.optionTitle,
                        deviceList: resetItem ? 'lowBattery' : el.optionTitle,
                        adminHistory: resetItem ? 'All' : el.optionTitle,
                      }[pathName]
                    }
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <button
            onClick={resetSearchInfo}
            className="mr-12 rounded-lg border-2 border-primary px-[7rem]  py-1 text-primary"
          >
            Reset
          </button>
          <button
            onClick={requestToServerSearch}
            className="rounded-lg border-2 bg-primary px-[7rem] py-1 text-white"
          >
            Search
          </button>
        </div>
      </div>
    </>
  )
})

export default NestingFilter
