import { toJS } from 'mobx'
import { CgTrash } from 'react-icons/cg'
import { useParams } from 'react-router'

import DeleteCheck from '../../../components/modal/components/DeleteCheck'
import { SERVER_ADDRESS } from '../../../config'
import useStore from '../../../useStore'

const EquipRepairLog = ({ setOnModal }) => {
  const { detailDatas, usersInfo } = useStore()
  const { equipment } = detailDatas

  console.log('log', toJS(equipment))

  const deleteRequest = () => {
    fetch(`${SERVER_ADDRESS}equipment/${1}/delete`, {
      method: 'DELETE',
      headers: { Authorization: localStorage.getItem('accessToken') },
      body: JSON.stringify({
        history_id: 16,
      }),
    })
      .then((res) => res.json())
      .then((result) => console.log(result))
    //<get요청>
    fetch(`${SERVER_ADDRESS}equipment/${1}?offset=1`)
      .then((res) => res.json())
      .then((result) => detailDatas.setEquipment(result.equipment))
  }
  // return (
  //   <table className="w-full table-fixed border-2">
  //     <colgroup>
  //       <col span={1} style={{ width: '3%' }} />
  //       <col span={5} style={{ width: `${100 / 5 - 3}%` }} />
  //     </colgroup>
  //     <tbody>
  //       <tr className="bg-[#EFF2F5]">
  //         <td className="py-3  pl-3"> </td>
  //         {equipRepairTitle.map((el, idx) => {
  //           return (
  //             <td key={idx} className="py-3  pl-3">
  //               {el}
  //             </td>
  //           )
  //         })}
  //       </tr>
  //       {equipment?.repaired_history.map((data) => {
  //         console.log(data)
  //         return (
  //           <tr key={data.id} id={data.id}>
  //             <td className="pl-4">
  //               {toJS(usersInfo)._isEquipmentControl && (
  //                 <button
  //                   type="button"
  //                   onClick={(e) => {
  //                     setOnModal({
  //                       clicked: true,
  //                       childrun: <DeleteCheck setOnModal={setOnModal} deleteApi={deleteRequest} />,
  //                     })
  //                   }}
  //                 >
  //                   <CgTrash style={{ color: 'red' }} />
  //                 </button>
  //               )}
  //             </td>
  //             <td className="py-3 pl-3">{data.date}</td>
  //             <td className="py-3 pl-3">{data.manager.name}</td>
  //             <td className=" py-3 pl-3">{data.manager.company}</td>
  //             <td className=" py-3 pl-3">{data.repairedPurpose.content}</td>
  //             <td className="py-3 pl-3">{data.content}</td>
  //           </tr>
  //         )
  //       })}
  //     </tbody>
  //   </table>
  // )
}

export default EquipRepairLog

const equipRepairTitle = ['Repair Date', 'manager', 'Company', 'Repair purpose', 'Content']
