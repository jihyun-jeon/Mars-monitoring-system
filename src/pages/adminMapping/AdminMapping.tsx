import axios from 'axios'
import { observer } from 'mobx-react'
import { useState, useEffect, useContext } from 'react'
import { FcOk, FcHighPriority } from 'react-icons/fc'

import AppContext from '../../AppContext'
import { SERVER_ADDRESS } from '../../config'
import useStore from '../../useStore'
import DeviceAddItemModal from './components/deviceAddItemModal/DeviceAddItemModal'
import DeviceMappingList from './components/deviceMappingList/DeviceMappingList'
import DeviceMenu from './components/deviceMenu/DeviceMenu'
import EquipmentAddItemModal from './components/equipmentaddItemModal/EquipmentAddItemModal'
import EquipmentMappingList from './components/equipmentMappingList/EquipmentMappingList'
import EquipmentMenu from './components/equipmentMenu/EquipmentMenu'

import './AdminMapping.css'

const AdminMapping = observer(() => {
  const appContext = useContext(AppContext)

  const { listDatas, addItemToggle } = useStore()

  const [isLoading, setIsLoading] = useState(true)

  // checkBox Toggle
  const [isEquipmentChecked, setIsEquipmentChecked] = useState(false)
  const [isDeviceChecked, setIsDeviceChecked] = useState(false)

  const [equipmentCheckedItems, setEquipmentCheckedItems] = useState(new Set())
  const equipmentCheckedValue: any = Array.from(equipmentCheckedItems)

  const [deviceCheckedItems, setDeviceCheckedItems] = useState(new Set())
  const deviceCheckedValue: any = Array.from(deviceCheckedItems)

  const equipmnetCheckedItemHandler = (id: string, isEquipmentChecked: boolean) => {
    if (isEquipmentChecked) {
      equipmentCheckedItems.add(id)
      setEquipmentCheckedItems(equipmentCheckedItems)
    } else if (!isEquipmentChecked && equipmentCheckedItems.has(id)) {
      equipmentCheckedItems.delete(id)
      setEquipmentCheckedItems(equipmentCheckedItems)
    }
  }

  const deviceCheckedItemHandler = (id: string, isDeviceChecked: boolean) => {
    if (isDeviceChecked) {
      deviceCheckedItems.add(id)
      setDeviceCheckedItems(deviceCheckedItems)
    } else if (!isDeviceChecked && deviceCheckedItems.has(id)) {
      deviceCheckedItems.delete(id)
      setDeviceCheckedItems(deviceCheckedItems)
    }
  }

  const equipmentCheckHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event
    setIsEquipmentChecked(!isEquipmentChecked)
    equipmnetCheckedItemHandler(target.value, target.checked)
  }

  const deviceCheckHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event
    setIsDeviceChecked(!isDeviceChecked)
    deviceCheckedItemHandler(target.value, target.checked)
  }

  const requestToServerListDatas = async () => {
    let response
    try {
      response = await axios.get(`${SERVER_ADDRESS}equipment/match/list`, {
        headers: {
          Authorization: `${localStorage.getItem('accessToken')}`,
        },
      })
      listDatas.setAdminMappingEquipmentListData(response.data)
      listDatas.setAdminMappingDeviceListData(response.data)
      setIsLoading(false)
    } catch (error: any) {
      switch (error.response.data.message) {
        case 'DECODE_ERROR':
          appContext.setToastIcon([<FcHighPriority key="1" className="text-2xl" />])
          appContext.setToastMessage([`You don't have permission`])
          break
        default:
          appContext.setToastIcon([<FcHighPriority key="1" className="text-2xl" />])
          appContext.setToastMessage(['Request Error'])
          break
      }
    }
  }

  const requestToServerMatching = async () => {
    const collectiveQuery = {
      equipmentId:
        equipmentCheckedValue && `equipment_id=${equipmentCheckedValue.join()}`.concat('&'),
      deviceId:
        deviceCheckedValue && `equipment_gps_tracker_id=${deviceCheckedValue.join()}`.concat('&'),
    }

    const { equipmentId, deviceId } = collectiveQuery

    const queryAddress = `${SERVER_ADDRESS}equipment/match?${equipmentId}${deviceId}`.slice(0, -1)

    if (equipmentCheckedValue.length === 0) {
      return [
        appContext.setToastIcon([<FcHighPriority key="1" className="text-2xl" />]),
        appContext.setToastMessage(['Equipment None selected']),
      ]
    } else if (deviceCheckedValue.length === 0) {
      return [
        appContext.setToastIcon([<FcHighPriority key="1" className="text-2xl" />]),
        appContext.setToastMessage(['Device None selected']),
      ]
    }

    try {
      const response = await axios(queryAddress, {
        method: 'post',
        headers: {
          Authorization: localStorage.getItem('accessToken'),
        },
      })
      if (response.data.message === 'SUCCESS') {
        requestToServerListDatas()
        appContext.setToastIcon([<FcOk key="1" className="text-2xl" />])
        appContext.setToastMessage(['Complete Matching'])
      }
    } catch (error: any) {
      switch (error.response.data.message) {
        case 'DOES_NOT_EXIST':
          appContext.setToastIcon([<FcHighPriority key="1" className="text-2xl" />])
          appContext.setToastMessage(['Matching Failed'])
          break
        case 'NO_PERMISSION':
          appContext.setToastIcon([<FcHighPriority key="1" className="text-2xl" />])
          appContext.setToastMessage(['An ID that does not exist'])
          break
        case 'DECODE_ERROR':
          appContext.setToastIcon([<FcHighPriority key="1" className="text-2xl" />])
          appContext.setToastMessage([`You don't have permission`])
          break
        default:
          appContext.setToastIcon([<FcHighPriority key="1" className="text-2xl" />])
          appContext.setToastMessage(['Request Error'])
          break
      }
    }
  }

  useEffect(() => {
    requestToServerListDatas()
  }, [])

  return (
    <>
      <div className="listWrapper h-screen overflow-y-scroll">
        <div className="my-4 flex items-center justify-end">
          <p className="mr-4 text-xl">Please select the Equipment and Device</p>
          <button
            onClick={requestToServerMatching}
            className="rounded-lg border-2 bg-primary px-[4rem] py-1 text-white"
          >
            Mapping
          </button>
        </div>
        <div className="listWrapper flex gap-4">
          <div className="w-1/2 bg-bgDefault ">
            <EquipmentMenu />
            <EquipmentMappingList
              isLoading={isLoading}
              isEquipmentChecked={isEquipmentChecked}
              equipmentCheckedValue={equipmentCheckedValue}
              equipmentCheckHandler={equipmentCheckHandler}
            />
          </div>
          <div className="border border-[#BAC7D5]" />
          <div className="w-1/2 bg-bgDefault">
            <DeviceMenu />
            <DeviceMappingList
              isLoading={isLoading}
              isDeviceChecked={isDeviceChecked}
              deviceCheckedValue={deviceCheckedValue}
              deviceCheckHandler={deviceCheckHandler}
            />
          </div>
        </div>
      </div>
      {addItemToggle.isEquipmentAddModal && <EquipmentAddItemModal />}
      {addItemToggle.isDeviceAddModal && <DeviceAddItemModal />}
    </>
  )
})

export default AdminMapping
