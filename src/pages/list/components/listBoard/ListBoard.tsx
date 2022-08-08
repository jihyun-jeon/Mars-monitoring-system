import axios from 'axios'
import { toJS } from 'mobx'
import { observer } from 'mobx-react'
import React, { useState, useContext } from 'react'
import { IoPowerSharp } from 'react-icons/io5'
import ReactLoading from 'react-loading'
import { useNavigate } from 'react-router'

import AppContext from '../../../../AppContext'
import DeleteCheck from '../../../../components/modal/components/DeleteCheck'
import Modal from '../../../../components/modal/modal'
import { SERVER_ADDRESS } from '../../../../config'
import useStore from '../../../../useStore'
import adminDeviceItemData from '../../components/data/adminDeviceItemData'
import adminEquipmentItemData from '../../components/data/adminEquipmentItemData'
import deviceItemData from '../data/deviceItemData'
import equipmentItemData from '../data/equipmentItemData'
import Pagination from '../pagination/Pagination'

import './ListBoard.css'

interface onModalType {
  clicked: boolean
  childrun: null | any
}

type Props = {
  pathName: string
  isLoading: boolean
}

const ListBoard = observer(({ pathName, isLoading }: Props) => {
  const navigate = useNavigate()

  const appContext = useContext(AppContext)

  const { usersInfo, listDatas, pathNumbers } = useStore()

  const { isEquipmentControl } = usersInfo

  const [onModal, setOnModal] = useState<onModalType>({ clicked: false, childrun: null })

  const renderData = {
    equipmentData: toJS(listDatas.equipmentListData),
    deviceData: toJS(listDatas.deviceListData),
    adminHistoryData: toJS(listDatas.adminHistoryListData),
  }

  const { equipmentData, deviceData, adminHistoryData } = renderData

  const adminHistoryCombineData = adminHistoryData.results?.equipment_repaired.concat(
    adminHistoryData.results?.equipment_matched,
  )

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

  const requestToServerDeleteId = async () => {
    const equipmentGetAddress = `${SERVER_ADDRESS}equipment/list`
    const equipmentDeleteQueryAddress = `${SERVER_ADDRESS}equipment/list/delete?ids=[${checkedValue}]`
    const deviceGetAddress = `${SERVER_ADDRESS}device/list`
    const deviceDeleteQueryAddress = `${SERVER_ADDRESS}device/list/delete?ids=[${checkedValue}]`
    let response
    try {
      switch (pathName) {
        case 'equipmentList':
          await axios.delete(equipmentDeleteQueryAddress, {
            headers: {
              Authorization: `${localStorage.getItem('access_token')}`,
            },
          })
          response = await axios.get(equipmentGetAddress)
          listDatas.setEquipmentListData(response.data)
          await appContext.setToastMessage(['Complete Delete'])
          break
        case 'deviceList':
          await axios.delete(deviceDeleteQueryAddress, {
            headers: {
              Authorization: `${localStorage.getItem('access_token')}`,
            },
          })
          response = await axios.get(deviceGetAddress)
          listDatas.setDeviceListData(response.data)
          await appContext.setToastMessage(['Complete Delete'])
          break
      }
    } catch (error: any) {
      if (error.response) {
        alert(error.response)
      }
    }
  }

  if (isLoading) {
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
  }

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
      {/* tabName: 현재 경로가 adminHistory일때만, 탭이 생성되며 클릭한 탭의 이름에 따라 버튼의 스타일 변경됩니다 */}
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
              if (pathName === 'equipmentList') {
                return equipmentItemData.map((item: any, idx) => (
                  <th key={idx} className="border-2 bg-[#EFF2F5] py-2">
                    {item}
                  </th>
                ))
              }

              if (pathName === 'deviceList') {
                return deviceItemData.map((item: any, idx) => (
                  <th key={idx} className="border-2 bg-[#EFF2F5] py-2">
                    {item}
                  </th>
                ))
              }

              if (pathName === 'adminHistory') {
                if (tabName.equipment === 'Equipment') {
                  return adminEquipmentItemData.map((item: any, idx) => (
                    <th key={idx} className="border-2 bg-[#EFF2F5] py-2">
                      {item}
                    </th>
                  ))
                } else {
                  return adminDeviceItemData.map((item: any, idx) => (
                    <th key={idx} className="border-2 bg-[#EFF2F5] py-2">
                      {item}
                    </th>
                  ))
                }
              }
            })()}
          </tr>
        </thead>
        {/* item: 현재 경로에 따라 장비,디바이스 아이템이 변경됩니다 */}
        {(() => {
          if (pathName === 'equipmentList' || pathName === 'deviceList')
            return (
              <tbody className="border">
                {pathCheckerOptionData()
                  .results.slice(offset, offset + limit)
                  .map((data: any, idx: number) => (
                    <tr
                      key={data.id}
                      className={
                        checkedValue.includes(data.id.toString() as never)
                          ? 'cursor-pointer bg-sky-100'
                          : 'cursor-pointer'
                      }
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
                              <td className="py-1.5 text-center">{data.company}</td>
                              <td className="py-1.5 text-center">
                                {data.driver[0]?.name ? data.driver[0]?.name : '-'}
                              </td>
                              <td className="py-1.5 text-center">
                                {data.deviceStatus[0]?.battery.length > 0
                                  ? data.deviceStatus[0]?.battery.slice(0, -3) + '%'
                                  : '-'}
                              </td>
                              <td className="py-1.5 text-center">
                                {data.deviceMatched[0]?.isMatched ? 'Matched' : 'UnMatched'}
                              </td>
                              <td className="py-1.5 text-center">
                                {data.deviceStatus[0]?.statusContent
                                  ? data.deviceStatus[0]?.statusContent
                                  : '-'}
                              </td>
                              <td className="flex justify-center py-1.5 text-center text-xl">
                                {data.isPower ? (
                                  <IoPowerSharp className="text-[#00d300]" />
                                ) : (
                                  <IoPowerSharp className="text-[#ff0000]" />
                                )}
                              </td>
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
                              <td className="flex justify-center py-1.5 text-center">
                                {data.status ? (
                                  <IoPowerSharp className="text-[#00d300]" />
                                ) : (
                                  <IoPowerSharp className="text-[#ff0000]" />
                                )}
                              </td>
                              <td className="py-1.5 text-center">{data.company}</td>
                              <td className="py-1.5 text-center">
                                {data.battery.length > 0 ? data.battery.slice(0, -3) + '%' : '-'}
                              </td>
                              {/* 데이터 수정 대기 (Matched Status)  */}
                              <td className="py-1.5 text-center">
                                {data.status ? 'Matched' : 'UnMatched'}
                              </td>
                              <td className="py-1.5 text-center">
                                {data.matchedEquipment[0]?.matchedEquipmentCategory
                                  ? data.matchedEquipment[0]?.matchedEquipmentCategory
                                  : '-'}
                              </td>
                              <td className="py-1.5 text-center">
                                {data.matchedEquipment[0]?.matchedEquipmentId
                                  ? data.matchedEquipment[0]?.matchedEquipmentId
                                  : '-'}
                              </td>
                            </>
                          )
                      })()}
                    </tr>
                  ))}
              </tbody>
            )
          if (pathName === 'adminHistory')
            if (tabName.equipment === 'Equipment') {
              return (
                <>
                  {adminHistoryCombineData
                    .slice(offset, offset + limit)
                    .map((data: any, idx: number) => (
                      <tbody className="border" key={idx}>
                        <tr>
                          <>
                            <td className="relative py-1.5 text-center">
                              {data.sortType === 'equipment_repaired' ? 'Repaired' : 'Matched'}
                            </td>
                            <td className="py-1.5 text-center">{data.originalId}</td>
                            <td className="py-1.5 text-center">{data.equipmentCompany}</td>
                            <td className="py-1.5 text-center">{data.date.slice(0, -13)}</td>
                          </>
                        </tr>
                      </tbody>
                    ))}
                </>
              )
              // 데이터 들어오면 수정
            } else {
              return (
                <>
                  {adminHistoryCombineData
                    .slice(offset, offset + limit)
                    .map((data: any, idx: number) => (
                      <tbody className="border" key={idx}>
                        <tr>
                          <>
                            <td className="relative py-1.5 text-center">
                              {data.sortType === 'equipment_repaired' ? 'Repaired' : 'Matched'}
                            </td>
                            <td className="py-1.5 text-center">{data.originalId}</td>
                            <td className="py-1.5 text-center">{data.date.slice(0, -13)}</td>
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
                  total={adminHistoryCombineData.length}
                  limit={limit}
                  page={page}
                  setPage={setPage}
                  setLimit={setLimit}
                />
              )
            } else {
              return (
                <Pagination
                  total={adminHistoryCombineData.length}
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
