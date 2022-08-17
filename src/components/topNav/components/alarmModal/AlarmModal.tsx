import { toJS } from 'mobx'
import { observer } from 'mobx-react'
import { useContext } from 'react'
import { FcHighPriority, FcOk } from 'react-icons/fc'

import AppContext from '../../../../AppContext'
import { instance } from '../../../../config'
import useStore from '../../../../useStore'

import './AlarmModal.css'

type AlarmMessageData = {
  deviceSerialNumber: string
  alert: string
  date: string
  id: number
}

const AlarmModal = observer(() => {
  const { listDatas, isTopNavIsToggle, messageId } = useStore()

  const appContext = useContext(AppContext)

  const messageData = toJS(listDatas.alarmData)

  const requestToServerDeleteMessage = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    const { value } = event.target as HTMLButtonElement
    messageId.setMessageSendId(value)

    const getAddress = 'user/alert'
    const deleteAddress = `user/alert/delete?alert_id=${messageId.messageSendId}`

    try {
      await instance(deleteAddress, {
        method: 'delete',
        headers: {
          Authorization: `${localStorage.getItem('accessToken')}`,
        },
      })
      const userAlarmData = await instance(getAddress, {
        method: 'get',
        headers: {
          Authorization: `${localStorage.getItem('accessToken')}`,
        },
      })
      messageId.setMessageSendId('')
      listDatas.setAlarmData(
        userAlarmData.data.result.rowBattery.concat(userAlarmData.data.result.networkError),
      )
      appContext.setToastIcon([<FcOk key="1" className="text-2xl" />])
      appContext.setToastMessage(['Complete Deleted'])
    } catch (error) {
      if (error) {
        appContext.setToastIcon([<FcHighPriority key="1" className="text-2xl" />])
        appContext.setToastMessage(['Deletion Failed'])
      } else {
        appContext.setToastIcon([<FcHighPriority key="1" className="text-2xl" />])
        appContext.setToastMessage(['Lost connection to server'])
      }
    }
  }

  return (
    <div className="alarmModalWrapper absolute top-20 right-0 z-40 h-[30rem] w-[26rem] overflow-y-scroll border-2 bg-white">
      <div className="flex h-[96px] items-center justify-between bg-primary px-12">
        <div className="text-xl font-bold text-bgPaper">전체 알림</div>
      </div>
      {(() => {
        if (isTopNavIsToggle.isAlarmLoadingToggle) {
          return (
            <div className="absolute left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2 text-lg font-semibold text-[#C4C4C4]">
              Lost connection to server
            </div>
          )
        }

        if (!messageData.length) {
          return (
            <div className="absolute left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2 text-lg font-semibold text-[#C4C4C4]">
              No Data
            </div>
          )
        }

        if (messageData.length) {
          return (
            <>
              {messageData.map((data: AlarmMessageData) => (
                <div
                  key={data.id}
                  className="flex h-[96px] items-center justify-between border-b-2 bg-bgPaper px-8 last:border-b-0"
                >
                  <div>
                    <span className="mr-2 text-lg">{data.deviceSerialNumber}</span>
                    <span className="text-lg">{`${data.alert}`}</span>
                  </div>
                  <div>
                    <span className="mr-2 text-sm text-[#888888]">{data.date.slice(0, -13)}</span>
                  </div>
                  <button onClick={requestToServerDeleteMessage} value={data.id}>
                    X
                  </button>
                </div>
              ))}
            </>
          )
        }
      })()}
    </div>
  )
})

export default AlarmModal
