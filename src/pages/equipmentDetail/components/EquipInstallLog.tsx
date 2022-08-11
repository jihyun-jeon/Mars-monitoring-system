import { observer } from 'mobx-react'

import useStore from '../../../useStore'

const EquipInstallLog = observer(() => {
  const { detailDatas } = useStore()
  const { equipment } = detailDatas

  return (
    <div>
      <table className="w-full table-fixed border-2">
        <colgroup>
          <col span={1} style={{ width: '3%' }} />
          <col span={4} style={{ width: `${100 / 4 - 3}%` }} />
        </colgroup>

        <tbody>
          <tr className=" bg-[#EFF2F5]">
            <td className="py-3 pl-3"></td>
            {equipInstallTitle.map((el, idx) => {
              return (
                <td key={idx} className="py-3 pl-3">
                  {el}
                </td>
              )
            })}
          </tr>
          {equipment &&
            equipment.matched_history.map((data) => {
              return (
                <tr key={data.id} id={data.id}>
                  <td className="pl-4"></td>
                  <td className="py-3 pl-3">{data.lastLogTime}</td>
                  <td className="py-3 pl-3">{data.serialNumber}</td>
                  <td className=" py-3 pl-3">{data.manager.name}</td>
                  <td className=" py-3 pl-3">{data.company.name}</td>
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

export default EquipInstallLog

const equipInstallTitle = ['Last log time', 'Serial number', 'Manager', 'Company']
