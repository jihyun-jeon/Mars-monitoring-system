import axios from 'axios'
import { useState, useEffect, Dispatch, SetStateAction } from 'react'

import { SERVER_ADDRESS } from '../../../../config'
import useStore from '../../../../useStore'
import adminOptionData from '../data/adminOptionData'
import deviceOptionData from '../data/deviceOptionData'
import equipmentOptionData from '../data/equipmentOptionData'

type Props = {
  pathName: string
  setIsLoading: Dispatch<SetStateAction<boolean>>
}

const NestingFilter = ({ pathName, setIsLoading }: Props) => {
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

  const [equipmentSearchInfos, setEquipmentSearchInfos] = useState({
    EquipmentType: '',
    DeviceStatus: '',
    BatteryPercentage: '',
    PowerStatus: '',
    MatchedStatus: '',
  })

  const [deviceSearchInfos, setDeviceSearchInfos] = useState({
    BatteryStatus: '',
    Company: '',
    MatchedStatus: '',
    PowerStatus: '',
  })

  const handleUserSelector = (e: any) => {
    const { value, name } = e.target
    switch (pathName) {
      case 'equipmentList':
        switch (name) {
          case 'EquipmentType':
            setEquipmentSearchInfos((data) => ({ ...data, [name]: value }))
            break
          case 'DeviceStatus':
            setEquipmentSearchInfos((data) => ({ ...data, [name]: value }))
            break
          case 'BatteryPercentage':
            setEquipmentSearchInfos((data) => ({ ...data, [name]: value }))
            break
          case 'PowerStatus':
            setEquipmentSearchInfos((data) => ({ ...data, [name]: value }))
            break
          case 'MatchedStatus':
            setEquipmentSearchInfos((data) => ({ ...data, [name]: value }))
            break
        }
        break
      case 'deviceList':
        switch (name) {
          case 'BatteryStatus':
            setDeviceSearchInfos((data) => ({ ...data, [name]: value }))
            break
          case 'Company':
            setDeviceSearchInfos((data) => ({ ...data, [name]: value }))
            break
          case 'MatchedStatus':
            setDeviceSearchInfos((data) => ({ ...data, [name]: value }))
            break
          case 'PowerStatus':
            setDeviceSearchInfos((data) => ({ ...data, [name]: value }))
            break
        }
        break
    }
  }

  const equipmentRequestServer = async () => {
    const { EquipmentType, DeviceStatus, BatteryPercentage, PowerStatus, MatchedStatus } =
      equipmentSearchInfos

    const collectiveQuery = {
      equipmentTypeId: EquipmentType && `type_id=${EquipmentType}`.concat('&'),
      deviceStatusId: DeviceStatus && `status_id=${DeviceStatus}`.concat('&'),
      batteryPercentage: BatteryPercentage && `battery=20`.concat('&'),
      equipmentPowerStatus: PowerStatus && `is_power=${PowerStatus}`.concat('&'),
      matchedStatus: MatchedStatus && `is_matched=${MatchedStatus}`.concat('&'),
    }

    const {
      equipmentTypeId,
      deviceStatusId,
      batteryPercentage,
      equipmentPowerStatus,
      matchedStatus,
    } = collectiveQuery

    const queryAddress =
      `${SERVER_ADDRESS}equipment/list?${equipmentTypeId}${deviceStatusId}${batteryPercentage}${equipmentPowerStatus}${matchedStatus}`.slice(
        0,
        -1,
      )

    try {
      const response = await axios.get(queryAddress)
      listDatas.setEquipmentListData(response.data)
      setIsLoading(false)
    } catch (error: any) {
      if (error.response) {
        alert(error.response)
      }
    }
  }

  const deviceRequestServer = async () => {
    const { BatteryStatus, Company, MatchedStatus, PowerStatus } = deviceSearchInfos

    const collectiveQuery = {
      batteryStatusId: BatteryStatus && `batteryStatus=${BatteryStatus}`.concat('&'),
      companyId: Company && `company=${Company}`.concat('&'),
      matchedStatusId: MatchedStatus && `matchedStatus=${MatchedStatus}`.concat('&'),
      powerStatusId: PowerStatus && `powerStatus=${PowerStatus}`.concat('&'),
    }

    const { batteryStatusId, companyId, matchedStatusId, powerStatusId } = collectiveQuery

    const queryAddress =
      `${SERVER_ADDRESS}device/list?${batteryStatusId}${companyId}${matchedStatusId}${powerStatusId}`.slice(
        0,
        -1,
      )

    try {
      const response = await axios.get(queryAddress)
      listDatas.setDeviceListData(response.data)
      setIsLoading(false)
    } catch (error: any) {
      if (error.response) {
        console.log(error.response)
      }
    }
  }

  const adminHistoryRequestServer = async () => {
    const address = `${SERVER_ADDRESS}equipment/admin/list`
    try {
      const response = await axios.get(address, {
        headers: {
          Authorization: `${localStorage.getItem('accessToken')}`,
        },
      })
      listDatas.setAdminHistoryData(response.data)
      setIsLoading(false)
    } catch (error: any) {
      if (error.response) {
        alert(error.response)
      }
    }
  }

  const [resetOption, setResetOption] = useState(true)

  const resetInfo = () => {
    switch (pathName) {
      case 'equipmentList':
        setEquipmentSearchInfos((data) => ({
          ...data,
          ['EquipmentType']: '',
          ['DeviceStatus']: '',
          ['Battery']: '',
          ['ActiveStatus']: '',
          ['MatchedStatus']: '',
        }))
        setResetOption(false)
        break
      case 'deviceList':
        setDeviceSearchInfos((data) => ({
          ...data,
          ['BatteryStatus']: '',
          ['Company']: '',
          ['MatchedStatus']: '',
          ['PowerStatus']: '',
        }))
        setResetOption(false)
        break
    }
  }

  useEffect(() => {
    switch (pathName) {
      case 'equipmentList':
        equipmentRequestServer()
        break
      case 'deviceList':
        deviceRequestServer()
        break
      case 'adminHistory':
        adminHistoryRequestServer()
        break
    }
  }, [])

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
                value={resetOption ? data.id : '0'}
                name={data.name}
                onFocus={() => setResetOption(true)}
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
          {(() => {
            if (pathName === 'equipmentList')
              return (
                <button
                  onClick={equipmentRequestServer}
                  className="rounded-lg border-2 bg-primary px-[7rem] py-1 text-white"
                >
                  Search
                </button>
              )
            if (pathName === 'deviceList')
              return (
                <button
                  onClick={deviceRequestServer}
                  className="rounded-lg border-2 bg-primary px-[7rem] py-1 text-white"
                >
                  Search
                </button>
              )
            if (pathName === 'adminHistory')
              return (
                <button
                  onClick={deviceRequestServer}
                  className="rounded-lg border-2 bg-primary px-[7rem] py-1 text-white"
                >
                  Search
                </button>
              )
          })()}
        </div>
      </div>
    </>
  )
}

export default NestingFilter
