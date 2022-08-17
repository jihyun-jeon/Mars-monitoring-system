import { toJS } from 'mobx'
import { observer } from 'mobx-react'
import { useParams } from 'react-router'

import DeleteCheck from '../../../components/modal/components/DeleteCheck'
import { SERVER_ADDRESS } from '../../../config'
import useStore from '../../../useStore'
import DeviceEdit from './DeviceEdit'

const DetailInfo = observer(({ setOnModal }) => {
  const { deviceDetailData } = useStore()

  const {
    usersInfo,
    deviceDetailData: { deviceData },
  } = useStore()
  const { id } = useParams()

  const equipId = deviceData?.matchedEquipment[0]?.id

  const unMatchRequest = async () => {
    await fetch(`${SERVER_ADDRESS}equipment/match/delete?equipment_id=${equipId}`, {
      method: 'DELETE',
      headers: { Authorization: localStorage.getItem('accessToken') },
    })

    await fetch(`${SERVER_ADDRESS}device/detail/${id}`)
      .then((res) => res.json())
      .then((result) => {
        // console.log(result)
        deviceDetailData.setDeviceData(result.results)
      })
  }

  return (
    <div className="relative mt-5">
      {usersInfo._isEquipmentControl && (
        <p className="absolute right-10 top-16">
          <button
            type="button"
            className="mt-4 mr-3 h-10 w-32 rounded-lg bg-primary text-xl text-white"
            onClick={(e) => {
              setOnModal({
                clicked: true,
                childrun: <DeleteCheck setOnModal={setOnModal} deleteApi={unMatchRequest} />,
              })
            }}
          >
            Unmatched
          </button>
          <button
            type="button"
            name="edit"
            className="mb-5 h-10 w-32 rounded-lg  bg-primary text-xl text-white"
            onClick={(e) => {
              setOnModal({ clicked: true, childrun: <DeviceEdit setOnModal={setOnModal} /> })
            }}
          >
            Edit
          </button>
        </p>
      )}
      {deviceData && (
        <div className="p-14 pt-28">
          <h1 className="mb-10 mt-[-5px] text-2xl font-semibold text-gray-400">
            General Information
          </h1>

          <ul className="grid w-full grid-cols-4 pb-16">
            <li>
              <p className="font-extrabold">Serial Number</p>
              <p>{deviceData.serialNumber}</p>
            </li>
            <li>
              <p className="font-extrabold">Qr code</p>
              <p>{deviceData.qrCode}</p>
            </li>
            <li>
              <p className="font-extrabold">company</p>
              <p>{deviceData.company}</p>
            </li>
            <li>
              <p className="font-extrabold">statellites Used</p>
              <p>{deviceData.device_other_info[0].statellitesUsed}</p>
            </li>
          </ul>

          <ul className="grid w-full grid-cols-4 pb-10">
            <li>
              <p className="font-extrabold">Matched Equipment</p>
              <p>{deviceData.matchedEquipment[0]?.matchedEquipmentOriginalId}</p>
            </li>
            <li>
              <p className="font-extrabold">Matched Equipment Category</p>
              <p>{deviceData.matchedEquipment[0]?.matchedEquipmentCategory}</p>
            </li>
          </ul>
          <div className="mb-20 mt-10 border-t-2" />
          <h1 className="mb-10 mt-[-15px] text-2xl font-semibold text-gray-400">Status</h1>
          <ul className="grid w-full grid-cols-4 pb-10">
            <li>
              <p className="font-extrabold">Power</p>
              <p>{deviceData.device_other_info[0].status}</p>
            </li>
            <li>
              <p className="font-extrabold">Last Log Time</p>
              <p>{deviceData.device_other_info[0].lastUpdateTime}</p>
            </li>
            <li>
              <p className="font-extrabold">Battery</p>
              <p>1500mAh</p>
            </li>
            <li>
              <p className="font-extrabold">Error</p>
              <p>{deviceData.device_other_info[0].error}</p>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
})

export default DetailInfo
