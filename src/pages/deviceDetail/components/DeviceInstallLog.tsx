import { useEffect } from 'react'
import { useParams } from 'react-router'

import { SERVER_ADDRESS } from '../../../config'
import useStore from '../../../useStore'

const DeviceInstallLog = () => {
  const { deviceDetailData } = useStore()
  const { id } = useParams()

  useEffect(() => {
    fetch(`${SERVER_ADDRESS}device/setup/history/${id}`)
      .then((res) => res.json())
      .then((result) => deviceDetailData.setDeviceInstallData(result.results))
  }, [])

  return (
    <div>
      <table className="w-full table-fixed border-2">
        <colgroup>
          <col span={1} style={{ width: '3%' }} />
          <col span={5} style={{ width: `${100 / 4 - 3}%` }} />
        </colgroup>
        <tbody>
          <tr className="bg-[#EFF2F5]">
            <td className="py-3  pl-3"> </td>
            {InstallLogTitle.map((el, idx) => (
              <td key={idx} className="py-3 pl-3">
                {el}
              </td>
            ))}
          </tr>

          {deviceDetailData.deviceInstallData?.map((el) => (
            <tr key={el.id}>
              <td className="py-3  pl-3"></td>
              <td className="py-3 pl-3">{el.lastUpdateTime}</td>
              <td className="py-3 pl-3">{el.deviceSerialNumber}</td>
              <td className=" py-3 pl-3">{el.equipmentSerialNumber}</td>
              <td className="py-3 pl-3">{el.matchedUserId}</td>
              <td className="py-3 pl-3">{el.matchedStatus ? 'matched' : 'unmatched'}</td>
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
}

export default DeviceInstallLog

const InstallLogTitle = [
  'Last log time',
  'Device Serial number',
  'Equipment Serial number',
  'Manager',
  'Matched state',
]
