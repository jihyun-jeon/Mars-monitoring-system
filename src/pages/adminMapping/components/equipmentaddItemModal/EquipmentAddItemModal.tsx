import axios from 'axios'
import { useContext, useState } from 'react'
import { FcOk, FcHighPriority } from 'react-icons/fc'

import AppContext from '../../../../AppContext'
import { SERVER_ADDRESS } from '../../../../config'
import useStore from '../../../../useStore'
import equipmentInputData from '../../data/equipmentInputData'
import {
  equipmentCategorySelectboxList,
  TypeValueArr,
  CompanyValueArr,
  UnitValueArr,
  DriverValueArr,
} from '../../data/equipmentSelectData'
import EquipmentAddItemModalLayout from './EquipmentAddItemModalLayout'

const EquipmentAddItemModal = () => {
  const { addItemToggle } = useStore()

  const appContext = useContext(AppContext)

  const [equipmentAddGeneralInfo, setEquipmentAddGeneralInfo] = useState({
    equipmentCategory: '',
    equipmentType: '',
    originalId: '',
    qrCode: '',
    plateNumber: '',
    manufactureData: '',
    capacity: '',
    equipmetCompany: '',
    unit: '',
    driver: '',
  })

  const [equipmentAddMaintananceInfo, setEquipmentAddMaintananceInfo] = useState({
    manageCompany: '',
    manageDepartment: '',
    manager: '',
    managePhoneNumber: '',
  })

  const handleUserSelector = (e: any) => {
    const { value, name } = e.target
    switch (name) {
      case 'equipmentCategory':
        setEquipmentAddGeneralInfo((data) => ({ ...data, [name]: value }))
        break
      case 'equipmentType':
        setEquipmentAddGeneralInfo((data) => ({ ...data, [name]: value }))
        break
      case 'originalId':
        setEquipmentAddGeneralInfo((data) => ({ ...data, [name]: value }))
        break
      case 'qrCode':
        setEquipmentAddGeneralInfo((data) => ({ ...data, [name]: value }))
        break
      case 'plateNumber':
        setEquipmentAddGeneralInfo((data) => ({ ...data, [name]: value }))
        break
      case 'manufactureData':
        setEquipmentAddGeneralInfo((data) => ({ ...data, [name]: value }))
        break
      case 'capacity':
        setEquipmentAddGeneralInfo((data) => ({ ...data, [name]: value }))
        break
      case 'equipmetCompany':
        setEquipmentAddGeneralInfo((data) => ({ ...data, [name]: value }))
        break
      case 'unit':
        setEquipmentAddGeneralInfo((data) => ({ ...data, [name]: value }))
        break
      case 'driver':
        setEquipmentAddGeneralInfo((data) => ({ ...data, [name]: value }))
        break
      case 'manageCompany':
        setEquipmentAddMaintananceInfo((data) => ({ ...data, [name]: value }))
        break
      case 'manageDepartment':
        setEquipmentAddMaintananceInfo((data) => ({ ...data, [name]: value }))
        break
      case 'manager':
        setEquipmentAddMaintananceInfo((data) => ({ ...data, [name]: value }))
        break
      case 'managePhoneNumber':
        setEquipmentAddMaintananceInfo((data) => ({ ...data, [name]: value }))
        break
    }
  }

  const {
    equipmentCategory,
    equipmentType,
    originalId,
    qrCode,
    plateNumber,
    manufactureData,
    capacity,
    equipmetCompany,
    unit,
    driver,
  } = equipmentAddGeneralInfo

  const { manageCompany, manageDepartment, manager, managePhoneNumber } =
    equipmentAddMaintananceInfo

  const requestData = {
    equipment_category_id: equipmentCategory,
    equipment_type_id: equipmentType,
    original_id: originalId,
    qr_code: qrCode,
    plate_number: plateNumber,
    manufacture_date: manufactureData,
    capacity: capacity,
    company_id: equipmetCompany,
    unit_id: unit,
    driver_id: driver,
    maintenance_company: manageCompany,
    maintenance_manager_department: manageDepartment,
    maintenance_manager_name: manager,
    maintenance_manager_phone_number: managePhoneNumber,
  }

  const requestToServerAdd = async () => {
    const address = `${SERVER_ADDRESS}equipment/registered`

    try {
      const response = await axios(address, {
        method: 'post',
        headers: {
          Authorization: localStorage.getItem('accessToken'),
        },
        data: requestData,
      })
      if (response.data.message === 'SUCCESS') {
        addItemToggle.setIsEquipmentAddModal(false)
        appContext.setToastIcon([<FcOk key="1" className="text-2xl" />])
        appContext.setToastMessage(['Equipment Registration Successful'])
      }
    } catch (error: any) {
      if (error.response.data.message) {
        switch (error.response.data.message) {
          case 'ORIGNAL_ID_NUMBER_EXIST':
            appContext.setToastIcon([<FcHighPriority key="1" className="text-2xl" />])
            appContext.setToastMessage(['This Orignal number has already been registered'])
            break
          case 'QR_CODE_EXIST':
            appContext.setToastIcon([<FcHighPriority key="1" className="text-2xl" />])
            appContext.setToastMessage(['This Qr Code has already been registered'])
            break
          case 'PLATE_NUMBER_EXIST':
            appContext.setToastIcon([<FcHighPriority key="1" className="text-2xl" />])
            appContext.setToastMessage(['This Plate Number has already been registered'])
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
      } else {
        return [
          appContext.setToastIcon([<FcHighPriority key="1" className="text-2xl" />]),
          appContext.setToastMessage(['Please enter required items']),
        ]
      }
    }
  }

  return (
    <EquipmentAddItemModalLayout>
      <h2 className="mb-8 flex justify-center text-3xl font-bold">Equipment Add</h2>
      <h3 className="mb-2 text-2xl font-bold text-gray-400">
        General Infomation
        <span className="text-lg">{`(`}</span>
        <span className="ml-1 mr-1 text-lg text-[#ff0000]">*</span>
        <span className="mr-1 text-xl">{`Required`}</span>
        <span className="text-lg">{`)`}</span>
      </h3>
      <div className="relative mb-2">
        <h4 className="mb-1  text-lg font-bold text-textPrimary">
          Equipment Category
          <span className="ml-2 text-[#ff0000]">*</span>
        </h4>
        <select
          required
          name={equipmentCategorySelectboxList.title}
          onChange={handleUserSelector}
          className="mb-2 block w-full rounded border border-gray-300 bg-btnActionSelect p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        >
          {equipmentCategorySelectboxList.results.map((el: any, idx: number) => (
            <option value={el.value} key={idx}>
              {el.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-2">
        <h4 className="mb-1 block text-lg font-bold text-textPrimary">
          Equipment Type
          <span className="ml-2 text-[#ff0000]">*</span>
        </h4>
        <select
          name={TypeValueArr.title}
          onChange={handleUserSelector}
          className="mb-2 block w-full rounded border border-gray-300 bg-btnActionSelect p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        >
          {TypeValueArr.results.map((el: any, idx: number) => (
            <option value={el.value} key={idx}>
              {el.name}
            </option>
          ))}
        </select>
      </div>
      {equipmentInputData.general.map((el) => (
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
      <div className="mb-4">
        <h4 className="mb-1 block text-lg font-bold text-textPrimary">
          Unit
          <span className="ml-2 text-[#ff0000]">*</span>
        </h4>
        <select
          name={UnitValueArr.title}
          onChange={handleUserSelector}
          className="mb-2 block w-full rounded border border-gray-300 bg-btnActionSelect p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        >
          {UnitValueArr.results.map((el: any, idx: number) => (
            <option value={el.value} key={idx}>
              {el.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-2">
        <h4 className="mb-1 block text-lg font-bold text-textPrimary">
          Company
          <span className="ml-2 text-[#ff0000]">*</span>
        </h4>
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
      <div className="mb-2">
        <h4 className="mb-1 block text-lg font-bold text-textPrimary">
          Driver
          <span className="ml-2 text-[#ff0000]">*</span>
        </h4>
        <select
          name={DriverValueArr.title}
          onChange={handleUserSelector}
          className="mb-2 block w-full rounded border border-gray-300 bg-btnActionSelect p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        >
          {DriverValueArr.results.map((el: any, idx: number) => (
            <option value={el.value} key={idx}>
              {el.name}
            </option>
          ))}
        </select>
      </div>
      <div className="my-8 w-full border"></div>
      <h3 className="mb-2 text-2xl font-bold text-gray-400">Maintanance</h3>
      {equipmentInputData.maintanance.map((el) => (
        <div key={el.id} className="mb-2 last:mb-10">
          <label className="mb-1 block text-lg font-bold text-textPrimary" htmlFor={el.inputId}>
            {el.labelTitle}
          </label>
          <input
            onChange={handleUserSelector}
            id={el.inputId}
            className="block w-full rounded border-2 border-solid bg-btnActionSelect p-1 py-1.5 "
            name={el.name}
            type={el.type}
            placeholder={el.placeHolder}
            required
          />
        </div>
      ))}
      <div className="absolute -bottom-[51.5rem] left-0 right-0">
        <button
          onClick={() => addItemToggle.setIsEquipmentAddModal(false)}
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
    </EquipmentAddItemModalLayout>
  )
}

export default EquipmentAddItemModal
