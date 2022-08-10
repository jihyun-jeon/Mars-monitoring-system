import { toJS } from 'mobx'
import { observer } from 'mobx-react'
import React, { useState } from 'react'
import ReactLoading from 'react-loading'

import useStore from '../../../../useStore'
import Pagination from '../../../list/components/pagination/Pagination'
import deviceListMenu from '../../data/deviceListMenu'

type Props = {
  isLoading: boolean
  isDeviceChecked: boolean
  deviceCheckedValue: any
  deviceCheckHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const DeviceMappingList = observer(
  ({ isLoading, isDeviceChecked, deviceCheckedValue, deviceCheckHandler }: Props) => {
    const { listDatas, addItemToggle } = useStore()

    const renderData = toJS(listDatas.adminMappingDeviceListData)

    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(1)
    const offset = (page - 1) * limit

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
        <table className="mb-8 w-full table-auto border-collapse bg-bgPaper">
          <thead>
            <tr>
              {deviceListMenu.map((item: any, idx) => (
                <th key={idx} className="border-2 bg-[#EFF2F5] py-2">
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          {renderData.results.equipmentGpsTracker
            .slice(offset, offset + limit)
            .map((data: any, idx: number) => (
              <tbody className="relative border" key={data.id}>
                <tr
                  className={
                    deviceCheckedValue.includes(data.id.toString() as never) ? 'bg-sky-100' : ''
                  }
                >
                  {
                    <>
                      <td className="relative py-1.5 text-center">
                        {data.serialNumber}
                        {
                          <label
                            htmlFor={`2${idx}`}
                            className={
                              isDeviceChecked
                                ? 'checkCursor absolute top-1/2 left-6 flex -translate-x-1/2 -translate-y-1/2 justify-center py-3 px-4'
                                : 'checkCursor absolute top-1/2 left-6 flex -translate-x-1/2 -translate-y-1/2 justify-center py-3 px-4'
                            }
                            onClick={(e) => e.stopPropagation()}
                          >
                            <input
                              id={`2${idx}`}
                              disabled={
                                data.id === Number(deviceCheckedValue.join())
                                  ? !isDeviceChecked
                                  : isDeviceChecked
                              }
                              checked={data.id === Number(deviceCheckedValue.join()) ? true : false}
                              onChange={deviceCheckHandler}
                              value={data.id}
                              type="checkbox"
                              className="checkCursor disabled:cursor-not-allowed"
                            />
                          </label>
                        }
                      </td>
                      <td className="py-1.5 text-center">{data.status}</td>
                      <td className="py-1.5 text-center">
                        {data.isMatched ? 'Matched' : 'UnMatched'}
                      </td>
                    </>
                  }
                </tr>
              </tbody>
            ))}
        </table>
        <div className="relative flex">
          <button
            onClick={() => addItemToggle.setIsDeviceAddModal(true)}
            className="mr-8 rounded-lg border-2 bg-primary px-[4rem] py-1 text-white"
          >
            Add
          </button>
          <Pagination
            total={renderData.results.equipment.length}
            limit={limit}
            page={page}
            setPage={setPage}
            setLimit={setLimit}
          />
        </div>
      </>
    )
  },
)
export default DeviceMappingList
