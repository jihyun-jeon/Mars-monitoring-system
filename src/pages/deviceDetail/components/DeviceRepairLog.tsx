import { observer } from 'mobx-react'
import { useEffect } from 'react'
import { CgTrash } from 'react-icons/cg'
import { useParams } from 'react-router'

import DeleteCheck from '../../../components/modal/components/DeleteCheck'
import { SERVER_ADDRESS } from '../../../config'
import useStore from '../../../useStore'

const DeviceRepairLog = observer(({ setOnModal }) => {
  const { deviceDetailData } = useStore()

  const { id } = useParams()

  useEffect(() => {
    // fetch('/data/deviceDetail/device_repair.json')
    // device/battery/list/1?order=latestUpdate
    fetch(`${SERVER_ADDRESS}device/repair/${id}?order=lastestHistory`)
      .then((res) => res.json())
      .then((result) => {
        // console.log('repair log', result)
        deviceDetailData.setDeviceRepairData(result.results)
      })
  }, [])

  const deleteRequest = async (deleteLogId) => {
    // delete요청
    await fetch(`${SERVER_ADDRESS}device/repair/${deleteLogId}/delete`, {
      method: 'DELETE',
      headers: { Authorization: localStorage.getItem('accessToken') },
    })
      .then((res) => res.json())
      .then((result) => console.log('2', result))

    //<get요청> // [버그1]리렌더링이 자동으로 안되는 이유?
    await fetch(`${SERVER_ADDRESS}device/repair/${id}?order=lastestHistory`) //
      .then((res) => res.json())
      .then((result) => {
        console.log('3', result)
        deviceDetailData.setDeviceRepairData(result.results)
      })
  }

  return (
    <div>
      <table className="w-full table-fixed border-2">
        <colgroup>
          <col span={1} style={{ width: '3%' }} />
          <col span={4} style={{ width: `${100 / 5 - 3}%` }} />
        </colgroup>
        <tbody>
          <tr className="bg-[#EFF2F5]">
            <td className="py-3  pl-3"> </td>
            {RepairTitle.map((el, idx) => (
              <td key={idx} className="py-3  pl-3">
                {el}
              </td>
            ))}
          </tr>
          {deviceDetailData.deviceRepairData &&
            deviceDetailData.deviceRepairData.map((data) => {
              return (
                <tr key={data.id}>
                  <td className="pl-4">
                    <button
                      type="button"
                      onClick={(e) => {
                        setOnModal({
                          clicked: true,
                          childrun: (
                            <DeleteCheck
                              setOnModal={setOnModal}
                              deleteApi={() => deleteRequest(data.id)}
                            />
                          ),
                        })
                      }}
                    >
                      <CgTrash style={{ color: 'red' }} />
                    </button>
                  </td>
                  <td className="py-3 pl-3">{data.date}</td>
                  <td className="py-3 pl-3">{data.repaired_manager_name}</td>
                  <td className="py-3 pl-3">{data.repaired_purpose_content}</td>
                  <td className="py-3 pl-3">{data.content}</td>
                </tr>
              )
            })}
        </tbody>
      </table>

      {/* page nation */}
      <div className="flexCenter relative w-full pb-28 pt-10">
        {/* page select */}
        <div className="flex">
          <button type="button" className="mx-5">
            &lt;
          </button>
          <ul className="flex">
            <li className="flexCenter w-5">1</li>
          </ul>
          <button type="button" className="mx-5">
            &gt;
          </button>
        </div>
      </div>
    </div>
  )
})

export default DeviceRepairLog

const RepairTitle = ['Date', 'Repaired Manager', 'Purpose', 'content']
