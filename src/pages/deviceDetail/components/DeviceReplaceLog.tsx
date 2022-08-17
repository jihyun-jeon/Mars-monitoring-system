import { observer } from 'mobx-react'
import { useEffect } from 'react'
import { CgTrash } from 'react-icons/cg'
import { useParams } from 'react-router'

import DeleteCheck from '../../../components/modal/components/DeleteCheck'
import { SERVER_ADDRESS } from '../../../config'
import useStore from '../../../useStore'

const DeviceReplaceLog = observer(({ setOnModal }) => {
  const { deviceDetailData } = useStore()

  const { id } = useParams()

  useEffect(() => {
    // fetch('/data/deviceDetail/device_replace.json')
    fetch(`${SERVER_ADDRESS}device/battery/list/${id}?order=latestUpdate`)
      .then((res) => res.json())
      .then((result) => {
        console.log(result)
        deviceDetailData.setDeviceReplaceData(result.results)
      })
  }, [])

  const deleteRequest = async (deleteLogId) => {
    // delete요청
    await fetch(`${SERVER_ADDRESS}device/battery/delete/${deleteLogId}`, {
      method: 'DELETE',
      headers: { Authorization: localStorage.getItem('accessToken') },
    })
    // .then((res) => res.json())
    // .then((result) => console.log(result))

    //<get요청>
    await fetch(`${SERVER_ADDRESS}device/battery/list/${id}?order=latestUpdate`)
      .then((res) => res.json())
      .then((result) => deviceDetailData.setDeviceReplaceData(result.results))
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
            {ReplaceTitle.map((el, idx) => (
              <td key={idx} className="py-3  pl-3">
                {el}
              </td>
            ))}
          </tr>
          {deviceDetailData.deviceReplaceData &&
            deviceDetailData.deviceReplaceData.map((data) => (
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
                <td className="py-3 pl-3">{data.battery} %</td>
                <td className="py-3 pl-3">{data.equipment_gps_tracker[0].serial_number}</td>
                <td className="py-3 pl-3">{data.repaired_manager_name}</td>
              </tr>
            ))}
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

export default DeviceReplaceLog

const ReplaceTitle = ['Date', 'Battery', 'Equipment serial number', 'manager']
