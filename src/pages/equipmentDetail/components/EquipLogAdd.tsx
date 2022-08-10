import { toJS, values } from 'mobx'
import { useContext, useState } from 'react'
import { useParams } from 'react-router'

import AppContext from '../../../AppContext'
import MakeInput from '../../../components/editBox/MakeInput'
import MakeSelectBox from '../../../components/editBox/MakeSelectBox'
import { SERVER_ADDRESS } from '../../../config'
import useStore from '../../../useStore'

const EquipLogAdd = ({ setOnModal }) => {
  const { detailDatas } = useStore()
  const appContext = useContext(AppContext)
  const { id } = useParams()

  const [newLog, setNewLog] = useState({
    content: '',
    date: '',
    repaired_manager_id: 1,
    repaired_purpose_id: 1,
  })

  console.log(newLog)

  return (
    <div className="relative h-[40rem] w-[40rem] rounded-lg  bg-white px-16 pt-5">
      <h1 className="flexCenter pb-10 text-2xl"> Add Repair log</h1>

      <div className="flexCenter mb-10 h-[70%] w-full bg-fuchsia-400">
        <MakeInput
          id="date"
          label={'Date'}
          value={''}
          style={''}
          type={'date'}
          onChange={(value) => setNewLog((prev) => ({ ...prev, date: value }))}
        />

        <MakeSelectBox
          id="repaired_purpose_id"
          label={'Purpose'}
          list={PurPoseValueArr}
          value={1}
          style={''}
          onChange={(value) => {
            setNewLog((prev) => ({ ...prev, repaired_purpose_id: value.value }))
          }}
        />

        <MakeSelectBox
          id="repaired_manager_id"
          label={'Manager'}
          list={ManagerValueArr}
          value={1}
          style={''}
          onChange={(value) => {
            setNewLog((prev) => ({ ...prev, repaired_manager_id: value.value }))
          }}
        />

        <MakeInput
          id="content"
          label={'Content'}
          value={''}
          style={''}
          type={''}
          onChange={(value) => setNewLog((prev) => ({ ...prev, content: value }))}
        />
      </div>

      {/* button  */}
      <div className="absolute bottom-0 left-0 w-full">
        <button
          type="button"
          className="h-10 w-1/2 bg-slate-400"
          onClick={() => setOnModal({ clicked: false, content: '' })}
        >
          Cancel
        </button>
        <button
          type="button"
          className="h-10 w-1/2  bg-primary"
          onClick={() => {
            appContext.setToastMessage(['등록이 완료되었습니다.'])
            setOnModal({ clicked: false, content: '' })
            console.log(newLog)
            // < post요청  >
            fetch(`${SERVER_ADDRESS}equipment/${id}/post`, {
              method: 'POST',
              headers: { Authorization: localStorage.getItem('accessToken') },
              body: JSON.stringify(newLog),
            })
              .then((res) => res.json())
              .then((result) => console.log(result))

            //<get요청>
            fetch(`${SERVER_ADDRESS}equipment/${id}?offset=1`)
              .then((res) => res.json())
              .then((result) => detailDatas.setEquipment(result.equipment))
          }}
        >
          Add
        </button>
      </div>
    </div>
  )
}

export default EquipLogAdd

const PurPoseValueArr = [
  { value: 1, text: 'battery replacement' },
  { value: 2, text: 'Replacement of parts' },
  { value: 3, text: 'n/w err. fix' },
]

const ManagerValueArr = [
  { value: 1, text: 'Leonard' },
  { value: 2, text: 'Martin' },
  { value: 3, text: 'Paul' },
]
