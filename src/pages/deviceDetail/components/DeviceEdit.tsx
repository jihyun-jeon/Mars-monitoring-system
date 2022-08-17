import { useContext, useState } from 'react'
import { FcOk } from 'react-icons/fc'

import AppContext from '../../../AppContext'
import MakeInput from '../../../components/editBox/MakeInput'
import MakeSelectBox from '../../../components/editBox/MakeSelectBox'
import { SERVER_ADDRESS } from '../../../config'
import useStore from '../../../useStore'

const DeviceEdit = ({ setOnModal }) => {
  const appContext = useContext(AppContext)

  const { deviceDetailData } = useStore()
  const { deviceData } = deviceDetailData
  const pathId = deviceData?.id

  const [putData, setPutData] = useState({
    company_id: 1,
    serial_number: deviceData?.serialNumber,
    qr_code: deviceData?.qrCode,
  })

  return (
    <div className="relative h-[20rem] w-[55rem] rounded-lg  bg-white px-16 pt-5">
      <h1 className="flexCenter  text-2xl">Device Edit</h1>

      <div className="mt-10 flex flex-col px-10">
        <div className="mb-10 flex justify-between">
          <MakeInput
            id="serial_number"
            label="Serial Number"
            value={putData.serial_number}
            onChange={(value) => setPutData((prev) => ({ ...prev, serial_number: value }))}
          />

          <MakeInput
            id="qr_code"
            label="QR Code"
            value={putData.qr_code}
            onChange={(value) => setPutData((prev) => ({ ...prev, qr_code: value }))}
          />

          <MakeSelectBox
            list={CompanyValueArr}
            value={putData.company_id}
            label={'Company'}
            id={'company_id'}
            onChange={(value) => setPutData((prev) => ({ ...prev, company_id: value.value }))}
          />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full">
        <button
          type="button"
          className="h-10 w-1/2 bg-slate-400"
          onClick={() => setOnModal({ clicked: false, content: '' })}
        >
          Cancel
        </button>
        <button
          type="button"
          className="h-10 w-1/2  bg-primary"
          onClick={async () => {
            // console.log(putData)
            // <patch>
            await fetch(`${SERVER_ADDRESS}device/detail/${pathId}`, {
              method: 'PATCH',
              headers: { Authorization: localStorage.getItem('accessToken') },
              body: JSON.stringify(putData),
            })

            // <get요청>
            await fetch(`${SERVER_ADDRESS}device/detail/${pathId}`)
              .then((res) => res.json())
              .then((result) => {
                deviceDetailData.setDeviceData(result.results)
              })

            appContext.setToastMessage(['Completed Edit'])
            appContext.setToastIcon([<FcOk key="1" className="text-2xl" />])
            setOnModal({ clicked: false, content: '' })
          }}
        >
          Edit
        </button>
      </div>
    </div>
  )
}

export default DeviceEdit

const CompanyValueArr = [
  { text: 'AAE', value: 1 },
  { text: 'SECL', value: 2 },
]
