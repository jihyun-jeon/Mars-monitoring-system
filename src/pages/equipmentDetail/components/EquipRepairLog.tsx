import { toJS } from 'mobx'
import { observer } from 'mobx-react'
import { CgTrash } from 'react-icons/cg'
import { useParams } from 'react-router'

import DeleteCheck from '../../../components/modal/components/DeleteCheck'
import { SERVER_ADDRESS } from '../../../config'
import useStore from '../../../useStore'

const EquipRepairLog = observer(({ setOnModal }) => {
  const { equipDetailDatas, usersInfo } = useStore()
  const { equipment } = equipDetailDatas

  const { id } = useParams()
  const pageNum = Math.ceil(equipment?.repaired_history.length / 10)

  const deleteRequest = async (deleteLogId) => {
    await fetch(`${SERVER_ADDRESS}equipment/${id}/delete`, {
      method: 'DELETE',
      headers: { Authorization: localStorage.getItem('accessToken') },
      body: JSON.stringify({
        history_id: deleteLogId,
      }),
    })
    // .then((res) => res.json())
    // .then((result) => console.log(result))
    //<get요청>
    await fetch(`${SERVER_ADDRESS}equipment/${id}?offset=0`)
      .then((res) => res.json())
      .then((result) => equipDetailDatas.setEquipment(result.equipment))
  }
  return (
    <div>
      <table className="w-full table-fixed border-2">
        <colgroup>
          <col span={1} style={{ width: '3%' }} />
          <col span={5} style={{ width: `${100 / 5 - 3}%` }} />
        </colgroup>
        <tbody>
          <tr className="bg-[#EFF2F5]">
            <td className="py-3  pl-3"> </td>
            {equipRepairTitle.map((el, idx) => {
              return (
                <td key={idx} className="py-3  pl-3">
                  {el}
                </td>
              )
            })}
          </tr>
          {equipment?.repaired_history.map((data) => {
            return (
              <tr key={data.id} id={data.id}>
                <td className="pl-4">
                  {toJS(usersInfo)._isEquipmentControl && (
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
                  )}
                </td>
                <td className="py-3 pl-3">{data.date}</td>
                <td className="py-3 pl-3">{data.manager.name}</td>
                <td className=" py-3 pl-3">{data.manager.company}</td>
                <td className=" py-3 pl-3">{data.repairedPurpose[0].content}</td>
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

export default EquipRepairLog

const equipRepairTitle = ['Repair Date', 'Manager', 'Company', 'Repair purpose', 'Content']
