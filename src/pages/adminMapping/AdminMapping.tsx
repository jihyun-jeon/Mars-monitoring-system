import axios from 'axios'
import { useState, useEffect } from 'react'

import { ADMIN_MAPPING_ADDRESS } from '../../config'
import useStore from '../../useStore'
import DeviceMappingList from './components/deviceMappingList/DeviceMappingList'
import DeviceMenu from './components/deviceMenu/DeviceMenu'
import EquipmentMappingList from './components/equipmentMappingList/EquipmentMappingList'
import EquipmentMenu from './components/equipmentMenu/EquipmentMenu'

import './AdminMapping.css'

const AdminMapping = () => {
  const { listDatas } = useStore()

  const [isLoading, setIsLoading] = useState(true)

  const requestToServerSearch = async () => {
    let response
    try {
      response = await axios.get('/data/adminMappingEquipment.json')
      // response = await axios.get(`${ADMIN_MAPPING_ADDRESS}equipment/match/list`)
      listDatas.setAdminMappingEquipmentListData(response.data)
      listDatas.setAdminMappingDeviceListData(response.data)
      setIsLoading(false)
    } catch (error: any) {
      if (error.response) {
        console.log(error.response)
      }
    }
  }

  useEffect(() => {
    requestToServerSearch()
  }, [])

  return (
    <div className="listWrapper h-screen overflow-y-scroll">
      <div className="my-4 flex items-center justify-end">
        <p className="mr-4 text-xl">Please select the Equipment and Device</p>
        <button className="rounded-lg border-2 bg-primary px-[4rem] py-1 text-white">
          Mapping
        </button>
      </div>
      <div className="listWrapper flex gap-4">
        <div className="w-1/2 bg-bgDefault ">
          <EquipmentMenu />
          <EquipmentMappingList isLoading={isLoading} />
        </div>
        <div className="border border-[#BAC7D5]" />
        <div className="w-1/2 bg-bgDefault">
          <DeviceMenu />
          <DeviceMappingList isLoading={isLoading} />
        </div>
      </div>
    </div>
  )
}

export default AdminMapping
