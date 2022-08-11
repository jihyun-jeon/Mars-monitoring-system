import { CgTrash } from 'react-icons/cg'

const DeviceRepairLog = () => {
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

            <td className="py-3  pl-3">Date</td>
            <td className="py-3  pl-3">Repaired Manager</td>
            <td className="py-3  pl-3">Purpose</td>
            <td className="py-3  pl-3">Comtent</td>
          </tr>

          <tr>
            <td className="pl-4">
              <button type="button">
                <CgTrash style={{ color: 'red' }} />
              </button>
            </td>
            <td className="py-3 pl-3">Martin</td>
            <td className="py-3 pl-3">Bettey replacement</td>
            <td className=" py-3 pl-3"></td>
          </tr>
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

export default DeviceRepairLog
