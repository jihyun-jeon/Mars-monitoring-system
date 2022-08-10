import { toJS } from 'mobx'
import { observer, Observer } from 'mobx-react'
import { useContext, useState } from 'react'

import MakeInput from '../../../../src/components/editBox/MakeInput'
import MakeSelectBox from '../../../../src/components/editBox/MakeSelectBox'
import AppContext from '../../../AppContext'
import { SERVER_ADDRESS } from '../../../config'
import useStore from '../../../useStore'

const EquipEdit = observer(({ setOnModal }) => {
  const { detailDatas } = useStore()
  const { equipment } = detailDatas
  const pathId = equipment?.id

  console.log('Edit', toJS(equipment))

  const [putData, setPutData] = useState(
    equipment
      ? {
          equipment_category_id: equipment.equipmentCategory.id,
          equipment_type_id: equipment.equipmentType.id,
          maintenance_company: equipment.maintenance_company,
          maintenance_manager_name: equipment.maintenance_manager_name,
          maintenance_manager_phone_number: equipment.maintenance_manager_phone_number,
          maintenance_manager_department: equipment.maintenance_manager_department,
          company_id: equipment.company.id,
          unit_id: equipment.unit.id,
          capacity: equipment.capacity,
          original_id: equipment.originalId,
          qr_code: equipment.qrCode,
          plate_number: equipment.plateNumber,
          manufacture_date: equipment.manufactureDate,
          driver_id: equipment.driver[0].id,
        }
      : null,
  )

  const appContext = useContext(AppContext)
  return (
    equipment && (
      <div className="relative h-[40rem] w-[80rem] rounded-lg  bg-white px-16 pt-5">
        <h1 className="flexCenter pb-6 text-3xl">Edit Equipment</h1>
        <div className="flex">
          <div className=" w-1/4 border-r">
            <img src="/public/imgs/equip.png" className="h-48 w-48 rounded-[50%]" />
            <MakeSelectBox
              id="equipment_category_id"
              label="Equipment"
              list={equipmentCategorySelectboxList}
              value={equipment.equipmentCategory.id}
              onChange={({ value }) => {
                setPutData((prev) => ({ ...prev, equipment_category_id: value }))
              }}
            />
            <MakeSelectBox
              id="equipment_type_id"
              label="Type"
              list={TypeValueArr}
              value={equipment.equipmentType.id}
              onChange={({ value }) =>
                setPutData((prev) => ({ ...prev, equipment_type_id: value }))
              }
            />

            <MakeInput
              id="qr_code"
              label="Qr code"
              value={equipment.qrCode ? equipment.qrCode : ''}
              onChange={(value) => setPutData((prev) => ({ ...prev, qr_code: value }))}
            />
          </div>
          <div className="mt-10 ml-10 w-3/4">
            <h1 className="text-2xl font-semibold text-gray-400">General Information</h1>
            <div className="mb-20 grid grid-cols-4 gap-2">
              <MakeInput
                id="original_id"
                label="original Number"
                value={equipment.originalId}
                onChange={(value) => setPutData((prev) => ({ ...prev, original_id: value }))}
              />
              <MakeInput
                id="plate_number"
                label="Plate Number"
                value={equipment.plateNumber}
                onChange={(value) => setPutData((prev) => ({ ...prev, plate_number: value }))}
              />
              <MakeSelectBox
                id="company_id"
                label="Company"
                list={CompanyValueArr}
                value={equipment.company.id}
                onChange={({ value }) => setPutData((prev) => ({ ...prev, company_id: value }))}
              />
              <MakeInput
                id="manufacture_date"
                label="Manufacture date"
                value={equipment.manufactureDate}
                onChange={(value) => setPutData((prev) => ({ ...prev, manufacture_date: value }))}
              />
              <MakeInput
                id="capacity"
                label="Capacity"
                value={equipment.capacity}
                onChange={(value) => setPutData((prev) => ({ ...prev, capacity: +value }))}
              />

              <MakeSelectBox
                id="unit_id"
                label="Unit"
                list={UnitValueArr}
                value={equipment.unit.id}
                onChange={(value) => setPutData((prev) => ({ ...prev, unit_id: +value }))}
              />
              {/* 드라이버 */}
              <MakeSelectBox
                id="driver_id"
                label="Driver Name"
                list={DriverValueArr}
                value={equipment.driverId}
                onChange={({ value }) => setPutData((prev) => ({ ...prev, driver_id: +value }))}
              />
            </div>
            <h1 className="text-2xl font-semibold text-gray-400">Maintanance</h1>
            <div className="mb-10 grid grid-cols-4">
              <MakeInput
                id="maintenance_company"
                label="Company"
                value={equipment.maintenance_company}
                style="w-[10rem]"
                onChange={(value) =>
                  setPutData((prev) => ({ ...prev, maintenance_company: value }))
                }
              />
              <MakeInput
                id="maintenance_manager_department"
                label="Department"
                value={equipment.maintenance_manager_department}
                style="w-[10rem]"
                onChange={(value) =>
                  setPutData((prev) => ({ ...prev, maintenance_manager_department: value }))
                }
              />
              <MakeInput
                id="maintenance_manager_name"
                label="Manager"
                value={equipment.maintenance_manager_name}
                style="w-[10rem]"
                onChange={(value) =>
                  setPutData((prev) => ({ ...prev, maintenance_manager_name: value }))
                }
              />
              <MakeInput
                id="maintenance_manager_phone_number"
                label="Phone number"
                value={equipment.maintenance_manager_phone_number}
                onChange={(value) =>
                  setPutData((prev) => ({ ...prev, maintenance_manager_phone_number: value }))
                }
              />
            </div>
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
            onClick={() => {
              // console.log('putData', putData)
              fetch(`${SERVER_ADDRESS}equipment/${pathId}/edit`, {
                method: 'PATCH',
                headers: { Authorization: localStorage.getItem('accessToken') },
                body: JSON.stringify(putData),
              })
                .then((res) => res.json())
                .then((result) => console.log(result))

              // // <get요청>
              fetch(`${SERVER_ADDRESS}equipment/${pathId}?offset=1`)
                .then((res) => res.json())
                .then((result) => detailDatas.setEquipment(result.equipment))
              appContext.setToastMessage(['수정이 완료되었습니다.'])
              setOnModal({ clicked: false, content: '' })
            }}
          >
            Edit
          </button>
        </div>
      </div>
    )
  )
})

export default EquipEdit

const equipmentCategorySelectboxList = [
  { text: 'Crane', value: 1 },
  { text: 'Boring machine', value: 2 },
  { text: 'Drill machine', value: 3 },
  { text: 'Aerial work platdiv', value: 4 },
  { text: 'mechanical handling equipment', value: 5 },
  { text: 'weldin machine', value: 6 },
]

const TypeValueArr = [
  { text: 'Aerial Equipment', value: 1 },
  { text: 'Assistance Equipment', value: 2 },
  { text: 'Lifting Equipment', value: 3 },
  { text: 'Transportation Equipment', value: 4 },
  { text: 'Concrete Equipment', value: 5 },
  { text: 'Earth Work Equipment', value: 6 },
  { text: 'Pavement Equipment', value: 7 },
  { text: 'Pilling/Digging Equipment', value: 8 },
]

const CompanyValueArr = [
  { text: 'AAE', value: 1 },
  { text: 'SECL', value: 2 },
]

const UnitValueArr = [
  { text: 'Ton', value: 1 },
  { text: 'Mm', value: 2 },
  { text: 'Kw', value: 3 },
]

const DriverValueArr = [
  { text: 'Luca', value: 1 },
  { text: 'Jayden', value: 2 },
  { text: 'River', value: 3 },
  { text: 'Alex', value: 4 },
  { text: 'Andrea', value: 5 },
  { text: 'Remi', value: 6 },
  { text: 'Rowan', value: 7 },
]
