import axios from 'axios'
import { toJS } from 'mobx'
import { observer } from 'mobx-react'
import React, { useState, useContext } from 'react'
import { FaSortDown } from 'react-icons/fa'
import ReactLoading from 'react-loading'
import { useNavigate } from 'react-router'

import AppContext from '../../../../AppContext'
import DeleteCheck from '../../../../components/modal/components/DeleteCheck'
import Modal from '../../../../components/modal/modal'
import { EQUIPMENT_LIST_ADDRESS, DEVICE_LIST_ADDRESS } from '../../../../config'
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

interface onModalType {
  clicked: boolean
  childrun: null | any
}

const ListBoard = observer(({ pathName, isLoading }: Props) => {
  const navigate = useNavigate()

  const appContext = useContext(AppContext)

  const { usersInfo, listDatas, pathNumbers } = useStore()

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

  const handleTab = (event: React.MouseEvent<HTMLElement>) => {
    const { innerText } = event.target as HTMLElement
    if (innerText === 'Equipment') {
      setTabName((text) => ({ ...text, ['equipment']: innerText, device: '' }))
    } else if (innerText === 'Device') {
      setTabName((text) => ({ ...text, ['device']: innerText, equipment: '' }))
    }
  }

  const requestToServerDeleteId = async () => {
    const equipmentQueryAddress = `${EQUIPMENT_LIST_ADDRESS}equipment/list/delete?ids=[${checkedValue}]`
    const deviceQueryAddress = `${DEVICE_LIST_ADDRESS}device?ids=[${checkedValue}]`
    try {
      switch (pathName) {
        case 'equipmentList':
          await axios.delete(equipmentQueryAddress, {
            headers: {
              Authorization: `${localStorage.getItem('access_token')}`,
            },
          })
          await appContext.setToastMessage(['삭제가 완료되었습니다'])
          break
        case 'deviceList':
          await axios.delete(deviceQueryAddress, {
            headers: {
              Authorization: `${localStorage.getItem('access_token')}`,
            },
          })
          await appContext.setToastMessage(['삭제가 완료되었습니다'])
          break
      }
    } catch (error: any) {
      if (error.response) {
        alert(error.response)
      }
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
      checkedItems.add(id)
      setCheckedItems(checkedItems)
    } else if (!isChecked && checkedItems.has(id)) {
      checkedItems.delete(id)
      setCheckedItems(checkedItems)
    }
  }

  const checkHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event
    setIsChecked(!isChecked)
    checkedItemHandler(target.value, target.checked)
  }

  const [onModal, setOnModal] = useState<onModalType>({ clicked: false, childrun: null })

  const authorityChecker = () => {
    if (checkedValue.length === 0) {
      alert('None selected')
    } else {
      setOnModal({
        clicked: true,
        childrun: <DeleteCheck setOnModal={setOnModal} deleteApi={requestToServerDeleteId} />,
      })
    }
  }

  if (isLoading)
    return (
      <div className="fixed top-0 left-0 h-screen w-screen bg-slate-200 opacity-60">
        <ReactLoading
          width={'10%'}
          height={'1%'}
          color={'#036DB7'}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </div>
    )

  return (
    <>
      {/* titleName: 현재 경로에 따라 title이 변경됩니다. */}
      {(() => {
        switch (pathName) {
          case 'equipmentList':
            return <h2 className="mb-2 text-2xl font-semibold text-black">Search Equipment</h2>
          case 'deviceList':
            return <h2 className="mb-2 text-2xl font-semibold text-black">Search Device</h2>
          case 'adminHistory':
            return <h2 className="mb-2 text-2xl font-semibold text-black">Search History</h2>
        }
      })()}
      {/* tabName: 현재 경로가 adminHistory일때만, 클릭한 탭의 이름에 따라 버튼의 스타일 변경됩니다 */}
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
      <table className="mb-8 w-full table-auto border-collapse bg-bgPaper">
        <thead>
          <tr>
            {/* listItem: 현재 경로에 따라 항목들이 변경됩니다 */}
            {(() => {
              if (pathName === 'equipmentList')
                return equipmentItemData.map((item: any, idx) => (
                  <th key={idx} className="border-2 bg-[#EFF2F5] py-2">
                    {item}
                  </th>
                ))
              if (pathName === 'deviceList')
                return deviceItemData.map((item: any, idx) => (
                  <th key={idx} className="border-2 bg-[#EFF2F5] py-2">
                    {item}
                  </th>
                ))
              if (pathName === 'adminHistory')
                return adminItemData.map((item: any, idx) => (
                  <th key={idx} className="border-2 bg-[#EFF2F5] py-2">
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
                      <tr
                        className="cursor-pointer"
                        onClick={() => {
                          navigate(`/${pathName.slice(0, -4) + 'Detail'}/${data.id}`)
                          if (pathName === 'equipmentList') {
                            pathNumbers.setEquipmentNumber(data.originalId)
                          } else {
                            pathNumbers.setDeviceListNumber(data.serialNumber)
                          }
                        }}
                      >
                        {(() => {
                          if (pathName === 'equipmentList')
                            return (
                              <>
                                <td className="relative py-1.5 text-center">
                                  {data.originalId}
                                  {isEquipmentControl && (
                                    <label
                                      htmlFor={`1${idx}`}
                                      className="checkCursor absolute left-6 top-1/2 flex -translate-x-1/2 -translate-y-1/2 justify-center px-4 py-2.5"
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      <input
                                        id={`1${idx}`}
                                        onChange={checkHandler}
                                        value={data.id}
                                        type="checkbox"
                                        className="checkCursor"
                                      />
                                    </label>
                                  )}
                                </td>
                                <td className="py-1.5 text-center">{data.equipmentType}</td>
                                <td className="py-1.5 text-center">
                                  {data.isPower ? 'ON' : 'OFF'}
                                </td>
                                {/* <td className="py-1.5 text-center">
                                  {data.deviceStatus[0]?.statusContent
                                    ? data.deviceStatus[0]?.statusContent
                                    : '-'}
                                </td> */}
                                {/* <td className="py-1.5 text-center">
                                  {data.deviceStatus[0]?.battery
                                    ? data.deviceStatus[0]?.battery
                                    : '-'}
                                </td>
                                <td className="py-1.5 text-center">
                                  {data.deviceMatched[0]?.isMatched ? 'Matched' : 'UnMatched'}
                                </td> */}
                                <td className="py-1.5 text-center">{data.company}</td>
                              </>
                            )
                          if (pathName === 'deviceList')
                            return (
                              <>
                                <td className="relative py-1.5 text-center">
                                  {data.serialNumber}
                                  {isEquipmentControl && (
                                    <label
                                      htmlFor={`1${idx}`}
                                      className="checkCursor absolute left-6 top-1/2 flex -translate-x-1/2 -translate-y-1/2 justify-center px-4 py-2.5"
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      <input
                                        id={`1${idx}`}
                                        onChange={checkHandler}
                                        value={data.id}
                                        type="checkbox"
                                        className="checkCursor"
                                      />
                                    </label>
                                  )}
                                </td>
                                {/* 데이터 보고 수정 */}
                                <td className="py-1.5 text-center">low</td>
                                <td className="py-1.5 text-center">
                                  {data.matchedEquipment[0]?.matchedEquipmentCategory
                                    ? data.matchedEquipment[0]?.matchedEquipmentCategory
                                    : '-'}
                                </td>
                                <td className="py-1.5 text-center">
                                  {data.status ? 'Matched' : 'UnMatched'}
                                </td>
                                <td className="py-1.5 text-center">{data.status ? 'ON' : 'OFF'}</td>
                                <td className="py-1.5 text-center">{data.company}</td>
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
                            <td className="relative py-1.5 text-center">Replace</td>
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
                            <td className="relative py-1.5 text-center">Repair</td>
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
        {/* deleteButton: 현재 경로에 따라 버튼이 있거나 없습니다 */}
        {(pathName === 'equipmentList' || pathName === 'deviceList') && isEquipmentControl && (
          <button
            onClick={authorityChecker}
            className="absolute left-0 rounded bg-primary px-20 py-1 text-bgPaper"
          >
            Delete
          </button>
        )}
        {onModal.clicked && <Modal contents={onModal.childrun} />}

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
