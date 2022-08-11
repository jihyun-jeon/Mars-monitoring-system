import axios from 'axios'
import { useState, useContext } from 'react'
import { FcOk, FcHighPriority } from 'react-icons/fc'

import AppContext from '../../../../AppContext'
import { SERVER_ADDRESS } from '../../../../config'
import useStore from '../../../../useStore'
import deviceInputData from '../../data/deviceInputData'
import { CompanyValueArr } from '../../data/deviceSelectData'
import DeviceAddItemModalLayout from './DeviceAddItemModalLayout'

const DeviceAddItemModal = () => {
  const { addItemToggle } = useStore()

  const appContext = useContext(AppContext)

  const [deviceAddInfo, setdeviceAddInfo] = useState({
    company: '',
    qrCode: '',
    serialNumber: '',
  })

  const handleUserSelector = (e: any) => {
    const { value, name } = e.target
    switch (name) {
      case 'company':
        setdeviceAddInfo((data) => ({ ...data, [name]: value }))
        break
      case 'qrCode':
        setdeviceAddInfo((data) => ({ ...data, [name]: value }))
        break
      case 'serialNumber':
        setdeviceAddInfo((data) => ({ ...data, [name]: value }))
        break
    }
  }

  const { company, qrCode, serialNumber } = deviceAddInfo

  const requestData = {
    company_id: Number(company),
    qr_code: Number(qrCode),
    serial_number: serialNumber,
  }

  const requestToServerAdd = async () => {
    const address = `${SERVER_ADDRESS}device/registered`

    try {
      const response = await axios(address, {
        method: 'post',
        headers: {
          Authorization: localStorage.getItem('accessToken'),
        },
        data: requestData,
      })
      if (response.data.message === 'SUCCESS') {
        addItemToggle.setIsDeviceAddModal(false)
        appContext.setToastIcon([<FcOk key="1" className="text-2xl" />])
        appContext.setToastMessage(['Device Registration Successful'])
      }
    } catch (error: any) {
      switch (error.response) {
        case 'SERIAL_NUMBER_EXIST':
          appContext.setToastIcon([<FcHighPriority key="1" className="text-2xl" />])
          appContext.setToastMessage([`This Serial Number has already been registered`])
          break
        case 'DECODE_ERROR':
          appContext.setToastIcon([<FcHighPriority key="1" className="text-2xl" />])
          appContext.setToastMessage([`You don't have permission`])
          break
        default:
          appContext.setToastIcon([<FcHighPriority key="1" className="text-2xl" />])
          appContext.setToastMessage(['Please enter required items'])
          break
      }
    }
  }

  return (
    <DeviceAddItemModalLayout>
      <h2 className="mb-8 flex justify-center text-3xl font-bold">Device Add</h2>
      <h3 className="mb-2 text-2xl font-bold text-gray-400">
        General Infomation
        <span className="text-lg">{`(`}</span>
        <span className="ml-1 mr-1 text-lg text-[#ff0000]">*</span>
        <span className="mr-1 text-xl">{`Required`}</span>
        <span className="text-lg">{`)`}</span>
      </h3>
      {deviceInputData.map((el) => (
        <div key={el.id} className="mb-2">
          <label className="mb-1 block text-lg font-bold text-textPrimary" htmlFor={el.inputId}>
            {el.labelTitle}
            <span className="ml-2 text-[#ff0000]">*</span>
          </label>
          <input
            onChange={handleUserSelector}
            id={el.inputId}
            className="block w-full rounded border-2 border-solid bg-btnActionSelect p-1 py-1.5"
            name={el.name}
            type={el.type}
            placeholder={el.placeHolder}
            required
          />
        </div>
      ))}
      <div className="relative mb-2">
        <h4 className="mb-1 block text-lg font-bold text-textPrimary">Company</h4>
        <select
          name={CompanyValueArr.title}
          onChange={handleUserSelector}
          className="mb-2 block w-full rounded border border-gray-300 bg-btnActionSelect p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        >
          {CompanyValueArr.results.map((el: any, idx: number) => (
            <option value={el.value} key={idx}>
              {el.name}
            </option>
          ))}
        </select>
      </div>

      <div className="absolute left-0 right-0 bottom-0">
        <button
          onClick={() => addItemToggle.setIsDeviceAddModal(false)}
          className="w-1/2 rounded-bl bg-[#000] py-2 font-bold text-[#fff] opacity-60"
        >
          Cancel
        </button>
        <button
          onClick={requestToServerAdd}
          className="w-1/2 rounded-br bg-primary py-2 font-bold text-[#fff]"
        >
          Add
        </button>
      </div>
    </DeviceAddItemModalLayout>
  )
}

export default DeviceAddItemModal
