import axios from 'axios'
import { toJS } from 'mobx'
import { observer } from 'mobx-react'
import { useContext, useState } from 'react'
import { FcHighPriority, FcOk } from 'react-icons/fc'
import ReactLoading from 'react-loading'

import AppContext from '../../../../AppContext'
import { SERVER_ADDRESS } from '../../../../config'
import useStore from '../../../../useStore'

import './AlarmModal.css'

const AlarmModal = observer(() => {
  const { usersInfo, listDatas } = useStore()

  const appContext = useContext(AppContext)

  const [messageSendId, setMessageSendId] = useState('')

  const messageData = toJS(listDatas.alarmData.result)

  const alarmCombineData = messageData.rowBattery.concat(messageData.networkError)

  const readingId = (event: any) => {
    const { value } = event.target
    setMessageSendId(value)
    requestToServerDeleteId()
  }

  const requestToServerDeleteId = async () => {
    const address = `${SERVER_ADDRESS}user/alert`
    let response: any
    try {
      await axios.delete(address, {
        headers: {
          Authorization: `${localStorage.getItem('accessToken')}`,
        },
        data: {
          alertId: messageSendId,
        },
      })
      if (response.data.message === 'ALERT_DELETE') {
        response = await axios.get(address)
        listDatas.setAlarmData(response.data)
        appContext.setToastIcon([<FcOk key="1" className="text-2xl" />])
        appContext.setToastMessage(['Complete Deleted'])
      }
    } catch (error: any) {
      if (error.response) {
        appContext.setToastIcon([<FcHighPriority key="1" className="text-2xl" />])
        appContext.setToastMessage(['Deletion Failed'])
      } else {
        appContext.setToastIcon([<FcHighPriority key="1" className="text-2xl" />])
        appContext.setToastMessage(['Request Error'])
      }
    }
  }

  if (usersInfo.isAlarmData) {
    return (
      <div className="fixed top-0 left-0 h-screen w-screen bg-slate-200 opacity-60">
        <ReactLoading
          width={'10%'}
          height={'1%'}
          color={'#036DB7'}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </div>
    )
  }

  return (
    <div className="alarmModalWrapper absolute top-20 right-0 z-40 h-[30rem] w-[26rem] overflow-y-scroll border-2 bg-white">
      <div className="flex h-[96px] items-center justify-between bg-primary px-12">
        <div className="text-xl text-bgPaper">전체 알림</div>
      </div>
      {alarmCombineData.map((data: any, idx: number) => (
        <div
          key={idx}
          className="flex h-[96px] items-center justify-between border-b-2 bg-bgPaper px-8 last:border-b-0"
        >
          <div>
            <span className="mr-2 text-lg">{data.deviceSerialNumber}</span>
            <span className="text-lg">{`: ${data.alert}`}</span>
          </div>
          <div>
            <span className="mr-2 text-sm text-[#888888]">{data.date.slice(0, -13)}</span>
          </div>
          <button onClick={readingId} value={data.id}>
            X
          </button>
        </div>
      ))}
      {/* data 유무에 따른 boolean 값 */}
      {!alarmCombineData.length && (
        <div className="absolute left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2 text-lg font-semibold text-[#C4C4C4]">
          No Data
        </div>
      )}
    </div>
  )
})

export default AlarmModal
