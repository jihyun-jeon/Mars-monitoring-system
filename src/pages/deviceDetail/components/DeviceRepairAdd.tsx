import { observer } from 'mobx-react'
import { useContext, useState } from 'react'
import { FcOk } from 'react-icons/fc' // 1-2 icon import
import { useParams } from 'react-router'

import MakeSelectBox from '../../..//components/editBox/MakeSelectBox'
import AppContext from '../../../AppContext'
import MakeInput from '../../../components/editBox/MakeInput'
import { SERVER_ADDRESS } from '../../../config'
import useStore from '../../../useStore'

const DeviceRepairAdd = observer(({ setOnModal }) => {
  const appContext = useContext(AppContext)
  const { id } = useParams()

  const { deviceDetailData } = useStore()

  const [newLog, setNewLog] = useState({
    repaired_manager_id: '1',
    repaired_purpose_id: '1',
    content: ' ',
    date: '',
  })

  return (
    <div className="relative h-[20rem] w-[65rem] rounded-lg  bg-white px-16 pt-10">
      <h1 className="flexCenter pb-12 text-2xl">Add Device Repair log</h1>

      <div className="flex justify-between">
        <MakeInput
          id="date"
          label={'Date'}
          value={newLog.date}
          style={''}
          type={'date'}
          onChange={(value) => setNewLog((prev) => ({ ...prev, date: value }))}
        />

        <MakeSelectBox
          list={ManagerList}
          value={newLog.repaired_manager_id}
          label={'Manager'}
          style={''}
          id={'repaired_manager_id'}
          onChange={(value) => setNewLog((prev) => ({ ...prev, repaired_manager_id: value.value }))}
        />

        <MakeSelectBox
          list={PurPoseValueArr}
          value={newLog.repaired_purpose_id}
          label={'Reqair purpose'}
          style={''}
          id={'repaired_purpose_id'}
          onChange={(value) => setNewLog((prev) => ({ ...prev, repaired_purpose_id: value.value }))}
        />

        <MakeInput
          id="content"
          label={'Content'}
          value={newLog.content}
          style={''}
          type={''}
          onChange={(value) => setNewLog((prev) => ({ ...prev, content: value }))}
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
            appContext.setToastMessage(['Log Add Completed'])
            appContext.setToastIcon([<FcOk key="1" className="text-2xl" />])
            setOnModal({ clicked: false, content: '' })
            console.log('repair post', newLog)

            // < post요청  >
            fetch(`${SERVER_ADDRESS}device/repair/${id}/post`, {
              method: 'POST',
              headers: { Authorization: localStorage.getItem('accessToken') },
              body: JSON.stringify(newLog),
            })
              .then((res) => res.json())
              .then((result) => console.log(result))

            //<get요청>
            fetch(`${SERVER_ADDRESS}device/repair/${id}?order=lastestHistory`)
              .then((res) => res.json())
              .then((result) => deviceDetailData.setDeviceRepairData(result.results))
          }}
        >
          Add
        </button>
      </div>
    </div>
  )
})

export default DeviceRepairAdd

const ManagerList = [
  { value: 1, text: 'Leonard' },
  { value: 2, text: 'Martin' },
  { value: 3, text: 'Paul' },
]

const PurPoseValueArr = [
  { value: 2, text: 'Replacement of parts' },
  { value: 3, text: 'n/w err. fix' },
]
