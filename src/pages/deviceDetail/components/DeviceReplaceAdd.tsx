import { observer } from 'mobx-react-lite'
import { useContext, useState } from 'react'
import { FcOk } from 'react-icons/fc'
import { useParams } from 'react-router'

import AppContext from '../../../AppContext'
import MakeInput from '../../../components/editBox/MakeInput'
import MakeSelectBox from '../../../components/editBox/MakeSelectBox'
import { SERVER_ADDRESS } from '../../../config'
import useStore from '../../../useStore'

const DeviceReplaceAdd = observer(({ setOnModal }) => {
  const appContext = useContext(AppContext)
  const { id } = useParams()

  const { deviceDetailData } = useStore()
  const { deviceReplaceData } = deviceDetailData
  const [newLog, setNewLog] = useState({
    repaired_manager_id: '1',
    date: '',
  })

  return (
    <div className="relative h-[18rem] w-[40rem] rounded-lg  bg-white px-16 pt-5">
      <h1 className="flexCenter pb-12 text-2xl">Add Device Replace log</h1>

      <div className="mb-10 flex justify-around">
        <MakeInput
          id={'date'}
          label={'Date'}
          value={newLog.date}
          style={''}
          type="date"
          onChange={(value) => setNewLog((prev) => ({ ...prev, date: value }))}
        />

        <MakeSelectBox
          list={ManagerList}
          value={newLog.repaired_manager_id}
          label={'Repaired Manager'}
          style={''}
          id={'repaired_manager_id'}
          onChange={(value) => setNewLog((prev) => ({ ...prev, repaired_manager_id: value.value }))}
        />
      </div>

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
            appContext.setToastIcon([<FcOk key="1" className="text-2xl" />])
            setOnModal({ clicked: false, content: '' })
            console.log('replace post', newLog)

            // < post요청  >
            fetch(`${SERVER_ADDRESS}device/battery/${id}`, {
              method: 'POST',
              headers: { Authorization: localStorage.getItem('accessToken') },
              body: JSON.stringify(newLog),
            })
              .then((res) => res.json())
              .then((result) => console.log(result))

            //<get요청>
            fetch(`${SERVER_ADDRESS}device/battery/list/${id}?order=latestUpdate`)
              .then((res) => res.json())
              .then((result) => {
                console.log('post->get', result)
                deviceDetailData.setDeviceReplaceData(result.results)
              })
          }}
        >
          Add
        </button>
      </div>
    </div>
  )
})

export default DeviceReplaceAdd

const ManagerList = [
  { value: 1, text: 'Leonard' },
  { value: 2, text: 'Martin' },
  { value: 3, text: 'Paul' },
]
