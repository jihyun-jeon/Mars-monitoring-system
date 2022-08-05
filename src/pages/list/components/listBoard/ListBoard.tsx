import axios from 'axios'
import { toJS } from 'mobx'
import { observer } from 'mobx-react'
import React, { useState } from 'react'

import { EQUIPMENT_LIST_ADDRESS } from '../../../../config'
import { useToggle } from '../../../../hooks/useHandleToggle'
import useStore from '../../../../useStore'
import adminItemData from '../data/adminItemData'
import deviceItemData from '../data/deviceItemData'
import equipmentItemData from '../data/equipmentItemData'
import Pagination from '../pagination/Pagination'

import './ListBoard.css'

type Props = {
  pathName: string
  isLoading: boolean
}

const ListBoard = observer(({ pathName, isLoading }: Props) => {
  const { usersInfo, listDatas } = useStore()
  const { isEquipmentControl } = usersInfo

  const renderData = {
    equipmentData: toJS(listDatas.equipmentListData),
    deviceData: toJS(listDatas.deviceListData),
    adminHistoryData: toJS(listDatas.adminHistoryListData),
  }

  const { equipmentData, deviceData, adminHistoryData } = renderData

  const pathCheckerOptionData: any = () => {
    switch (pathName) {
      case 'equipmentList':
        return equipmentData
      case 'deviceList':
        return deviceData
      case 'adminHistory':
        return adminHistoryData
    }
  }

  const [tabName, setTabName] = useState({
    equipment: 'Equipment',
    device: '',
  })

  const handleTab = (event: any) => {
    const { innerText } = event.target
    if (innerText === 'Equipment') {
      setTabName((text) => ({ ...text, ['equipment']: innerText, device: '' }))
    } else if (innerText === 'Device') {
      setTabName((text) => ({ ...text, ['device']: innerText, equipment: '' }))
    }
  }

  const [isModalToggle, handleModalToggled] = useToggle(false)

  // 제인님 모달이 생성되면 거기에 연결
  const requestToServerDeleteId = async () => {
    try {
      const queryAddress = `${EQUIPMENT_LIST_ADDRESS}equipment/list?${checkedValue.join('&')}`
      const response = await axios.delete(queryAddress)
      if (response.status === 204) {
        alert(response)
        // message 찾기
      }
    } catch (err) {
      alert(err)
    }
  }

  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const offset = (page - 1) * limit

  // checkBox Toggle
  const [isChecked, setIsChecked] = useState(false)
  const [checkedItems, setCheckedItems] = useState(new Set())

  const checkedValue = Array.from(checkedItems)

  const checkedItemHandler = (id: string, isChecked: boolean) => {
    if (isChecked) {
      checkedItems.add('id=' + id)
      setCheckedItems(checkedItems)
    } else if (!isChecked && checkedItems.has('id=' + id)) {
      checkedItems.delete('id=' + id)
      setCheckedItems(checkedItems)
    }
  }

  const checkHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event
    setIsChecked(!isChecked)
    checkedItemHandler(target.value, target.checked)
  }

  const authorityChecker = () => {
    if (checkedValue.length === 0) {
      alert('None selected')
    } else {
      handleModalToggled
    }
  }

  if (isLoading) return <div>Loading...</div>

  return (
    <>
      {/* titleName: 현재 경로에 따라 변경됩니다. */}
      {(() => {
        if (pathName === 'equipmentList')
          return (
            <h2 className="mb-2 text-2xl font-semibold text-black">{`Search Equipment(${
              pathCheckerOptionData().results.length
            }EA)`}</h2>
          )
        if (pathName === 'deviceList')
          return (
            <h2 className="mb-2 text-2xl font-semibold text-black">{`Search Device(${
              pathCheckerOptionData().results.length
            }EA)`}</h2>
          )
        if (pathName === 'adminHistory')
          return (
            <h2 className="mb-2 text-2xl font-semibold text-black">{`Search History(${
              pathCheckerOptionData().results.equipment.length
            }EA)`}</h2>
          )
      })()}
      {/* tabName: 클릭한 탭의 이름에 따라 버튼의 스타일 변경됩니다 */}
      {pathName === 'adminHistory' && (
        <div className="flex">
          <button
            onClick={handleTab}
            id={tabName.equipment && 'activeTab'}
            className="cursor-pointer rounded-t-md px-6 py-3 font-bold text-[#BAC7D5]"
          >
            Equipment
          </button>
          <button
            onClick={handleTab}
            id={tabName.device && 'activeTab'}
            className="cursor-pointer rounded-t-md px-6 py-3 font-bold text-[#BAC7D5]"
          >
            Device
          </button>
        </div>
      )}
      <table className="mb-8 w-full table-auto border-collapse">
        <thead>
          <tr>
            {/* listItem: 현재 경로에 따라 항목들이 변경됩니다 */}
            {(() => {
              if (pathName === 'equipmentList')
                return equipmentItemData.map((item: any, idx) => (
                  <th key={idx} className="border-2 py-2">
                    {item}
                  </th>
                ))
              if (pathName === 'deviceList')
                return deviceItemData.map((item: any, idx) => (
                  <th key={idx} className="border-2 py-2">
                    {item}
                  </th>
                ))
              if (pathName === 'adminHistory')
                return adminItemData.map((item: any, idx) => (
                  <th key={idx} className="border-2 py-2">
                    {item}
                  </th>
                ))
            })()}
          </tr>
        </thead>
        {/* item: 현재 경로에 따라 장비,디바이스가 변경됩니다 */}
        {(() => {
          if (pathName === 'equipmentList' || pathName === 'deviceList')
            return (
              <>
                {pathCheckerOptionData()
                  .results.slice(offset, offset + limit)
                  .map((data: any, idx: number) => (
                    <tbody className="border" key={idx}>
                      <tr>
                        {(() => {
                          if (pathName === 'equipmentList')
                            return (
                              <>
                                <td className="relative py-1.5 text-center">
                                  {data.company}
                                  {isEquipmentControl && (
                                    <input
                                      onChange={checkHandler}
                                      value={data.id}
                                      type="checkbox"
                                      className="absolute left-6 top-1/2 -translate-x-1/2 -translate-y-1/2"
                                    />
                                  )}
                                </td>
                                <td className="py-1.5 text-center">{data.equipmentType}</td>
                                <td className="py-1.5 text-center">
                                  {data.device[0]?.status ? data.device[0]?.status : '-'}
                                </td>
                                <td className="py-1.5 text-center">
                                  {data.isPower ? 'ON' : 'OFF'}
                                </td>
                                <td className="py-1.5 text-center">{data.originalId}</td>
                                <td className="py-1.5 text-center">
                                  {data.driver[0]?.name ? data.driver[0]?.name : '-'}
                                </td>
                                <td className="py-1.5 text-center">12가 3456</td>
                              </>
                            )
                          if (pathName === 'deviceList')
                            return (
                              <>
                                <td className="relative py-1.5 text-center">
                                  {data.id}
                                  {isEquipmentControl && (
                                    <input
                                      onChange={checkHandler}
                                      value={data.id}
                                      type="checkbox"
                                      className="absolute left-6 top-1/2 -translate-x-1/2 -translate-y-1/2"
                                    />
                                  )}
                                </td>
                                <td className="py-1.5 text-center">
                                  {data.matchedEquipment[0]?.matchedEquipmentId
                                    ? data.matchedEquipment[0]?.matchedEquipmentId
                                    : '-'}
                                </td>
                                <td className="py-1.5 text-center">2323-3231</td>
                                <td className="py-1.5 text-center">{data.company}</td>
                                <td className="py-1.5 text-center">low</td>
                                <td className="py-1.5 text-center">{data.status ? 'ON' : 'OFF'}</td>
                                <td className="py-1.5 text-center">
                                  {data.status ? 'Matched' : 'UnMatched'}
                                </td>
                              </>
                            )
                        })()}
                      </tr>
                    </tbody>
                  ))}
              </>
            )
          if (pathName === 'adminHistory')
            if (tabName.equipment === 'Equipment') {
              return (
                <>
                  {pathCheckerOptionData()
                    .results.equipment.slice(offset, offset + limit)
                    .map((data: any, idx: number) => (
                      <tbody className="border" key={idx}>
                        <tr>
                          <>
                            <td className="relative py-1.5 text-center">
                              Replace
                              {isEquipmentControl && (
                                <input
                                  onChange={checkHandler}
                                  value={data.id}
                                  type="checkbox"
                                  className="absolute left-6 top-1/2 -translate-x-1/2 -translate-y-1/2"
                                />
                              )}
                            </td>
                            <td className="py-1.5 text-center">{data.originalId}</td>
                            <td className="py-1.5 text-center">{data.companyName}</td>
                            <td className="py-1.5 text-center">2022.01.02</td>
                          </>
                        </tr>
                      </tbody>
                    ))}
                </>
              )
            } else {
              return (
                <>
                  {pathCheckerOptionData()
                    .results.equipmentGpsTracker.slice(offset, offset + limit)
                    .map((data: any, idx: number) => (
                      <tbody className="border" key={idx}>
                        <tr>
                          <>
                            <td className="relative py-1.5 text-center">
                              Repair
                              {isEquipmentControl && (
                                <input
                                  onChange={checkHandler}
                                  value={data.id}
                                  type="checkbox"
                                  className="absolute left-6 top-1/2 -translate-x-0 -translate-y-1/2"
                                />
                              )}
                            </td>
                            <td className="py-1.5 text-center">{data.serialNumber}</td>
                            <td className="py-1.5 text-center">{data.companyName}</td>
                            <td className="py-1.5 text-center">2022-03-20</td>
                          </>
                        </tr>
                      </tbody>
                    ))}
                </>
              )
            }
        })()}
      </table>
      <div className="relative flex justify-center">
        {isEquipmentControl && (
          <button
            onClick={authorityChecker}
            className="absolute left-0 rounded bg-primary px-20 py-1 text-bgPaper"
          >
            Delete
          </button>
        )}
        {/* pagination: 현재 경로에 따라 pagination이 변경됩니다 */}
        {(() => {
          if (pathName === 'equipmentList' || pathName === 'deviceList')
            return (
              <Pagination
                total={pathCheckerOptionData().results.length}
                limit={limit}
                page={page}
                setPage={setPage}
                setLimit={setLimit}
              />
            )
          if (pathName === 'adminHistory')
            if (tabName.equipment === 'Equipment') {
              return (
                <Pagination
                  total={pathCheckerOptionData().results.equipment.length}
                  limit={limit}
                  page={page}
                  setPage={setPage}
                  setLimit={setLimit}
                />
              )
            } else {
              return (
                <Pagination
                  total={pathCheckerOptionData().results.equipmentGpsTracker.length}
                  limit={limit}
                  page={page}
                  setPage={setPage}
                  setLimit={setLimit}
                />
              )
            }
        })()}
      </div>
    </>
  )
})

export default ListBoard
