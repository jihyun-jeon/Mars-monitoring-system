import { toJS } from 'mobx'
import { CgTrash } from 'react-icons/cg'

import DeleteCheck from '../../../components/modal/components/DeleteCheck'
import useStore from '../../../useStore'

const EquipInstallLog = ({ setOnModal }) => {
  const { detailDatas, usersInfo } = useStore()
  const { equipment } = detailDatas

  return (
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
          equipment.matched_history.map((el, idx) => {
            return (
              <tr key={idx}>
                <td className="pl-4">
                  {toJS(usersInfo)._isEquipmentControl && (
                    <button
                      type="button"
                      onClick={(e) => {
                        const deleteApi = () =>
                          fetch('/public/data/equipmentList.json')
                            .then((res) => res.json())
                            .then((result) => console.log(result))

                        setOnModal({
                          clicked: true,
                          childrun: <DeleteCheck setOnModal={setOnModal} deleteApi={deleteApi} />,
                        })
                      }}
                    >
                      <CgTrash style={{ color: 'red' }} />
                    </button>
                  )}
                </td>
                <td className="py-3 pl-3">{el.lastLogTime}</td>
                <td className="py-3 pl-3">{el.serialNumber}</td>
                <td className=" py-3 pl-3">{el.manager.name}</td>
                <td className=" py-3 pl-3">{el.company.name}</td>
              </tr>
            )
          })}
      </tbody>
    </table>
  )
}

export default EquipInstallLog

const equipInstallTitle = ['Lastlog time', 'Serial number', 'Manager', 'Company']
