import axios from 'axios'
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
  onModal: { clicked: boolean; childrun: null | any }
}

const NestingFilter = ({ pathName, setIsLoading, onModal }: Props) => {
  const { listDatas } = useStore()

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
    BatteryPercentage: '',
    PowerStatus: '',
    MatchedStatus: '',
    BatteryStatus: 'lowBattery',
  })

  const {
    EquipmentType,
    DeviceStatus,
    BatteryPercentage,
    PowerStatus,
    MatchedStatus,
    BatteryStatus,
  } = searchInfo

  const handleUserSelector = (e: any) => {
    const { value, name } = e.target
    switch (name) {
      case 'EquipmentType':
        setSearchInfo((data) => ({ ...data, [name]: value }))
        break
      case 'DeviceStatus':
        setSearchInfo((data) => ({ ...data, [name]: value }))
        break
      case 'BatteryPercentage':
        setSearchInfo((data) => ({ ...data, [name]: value }))
        break
      case 'PowerStatus':
        setSearchInfo((data) => ({ ...data, [name]: value }))
        break
      case 'MatchedStatus':
        setSearchInfo((data) => ({ ...data, [name]: value }))
        break
      case 'BatteryStatus':
        setSearchInfo((data) => ({ ...data, [name]: value }))
        break
    }
  }

  const requestToServerSearch = async () => {
    const collectiveQuery = {
      equipmentTypeId: EquipmentType && `type_id=${EquipmentType}`.concat('&'),
      deviceStatusId: DeviceStatus && `status_id=${DeviceStatus}`.concat('&'),
      batteryPercentage: BatteryPercentage && `battery=20`.concat('&'),
      equipmentPowerStatus: PowerStatus && `is_power=${PowerStatus}`.concat('&'),
      matchedStatus: MatchedStatus && `is_matched=${MatchedStatus}`.concat('&'),
      batteryStatus: BatteryStatus,
    }

    const {
      equipmentTypeId,
      deviceStatusId,
      batteryPercentage,
      equipmentPowerStatus,
      matchedStatus,
      batteryStatus,
    } = collectiveQuery

    const equipmentQueryAddress =
      `${EQUIPMENT_LIST_ADDRESS}equipment/list?${equipmentTypeId}${deviceStatusId}${batteryPercentage}${equipmentPowerStatus}${matchedStatus}`.slice(
        0,
        -1,
      )
    const deviceQueryAddress = `${DEVICE_LIST_ADDRESS}device/list?order=${batteryStatus}`
    const adminHistoryAddress = `${ADMIN_HISTORY_ADDRESS}/equipment/match`
    let response
    try {
      switch (pathName) {
        case 'equipmentList':
          // response = await axios.get('/data/equipmentList.json')
          response = await axios.get(equipmentQueryAddress)
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
    } catch (error: any) {
      if (error.response) {
        console.log(error.response)
      }
    }
  }

  const resetInfo = () => {
    switch (pathName) {
      case 'equipmentList':
        setSearchInfo((data) => ({
          ...data,
          ['EquipmentType']: '',
          ['DeviceStatus']: '',
          ['Battery']: '',
          ['ActiveStatus']: '',
          ['MatchedStatus']: '',
        }))
        break
      case 'deviceList':
        setSearchInfo((data) => ({ ...data, ['BatteryStatus']: 'lowBattery' }))
        break
    }
    window.location.reload()
    requestToServerSearch()
  }

  useEffect(() => {
    requestToServerSearch()
  }, [onModal.clicked])

  return (
    <>
      <h2 className="mb-2 text-2xl font-semibold text-black">{pathCheckerOptionData()[0].title}</h2>
      <div className="mb-8 flex w-full flex-col rounded border border-textDisabled bg-bgPaper py-4 px-12">
        <div className="mb-4 flex flex-wrap justify-center gap-4">
          {pathCheckerOptionData().map((data: any, idx: number) => (
            <div key={idx}>
              <h3 className="mb-1 block text-sm font-semibold text-gray-900 dark:text-gray-400">
                {data.name}
              </h3>
              <select
                name={data.name}
                onChange={handleUserSelector}
                className="block w-52 rounded border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              >
                {data.option.map((el: any, idx: number) => (
                  <option value={el.queryTitle} key={idx}>
                    {
                      {
                        equipmentList: el.optionTitle,
                        deviceList: el.optionTitle,
                        adminHistory: el.optionTitle,
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
            onClick={resetInfo}
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
}

export default NestingFilter
