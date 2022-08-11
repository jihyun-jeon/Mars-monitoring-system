import axios from 'axios'
import { observer } from 'mobx-react'
import { useContext, useEffect } from 'react'
import { FcHighPriority } from 'react-icons/fc'

import AppContext from '../../../../AppContext'
import { SERVER_ADDRESS } from '../../../../config'
import useStore from '../../../../useStore'

const AlarmData = observer(() => {
  const { usersInfo, listDatas } = useStore()

  const appContext = useContext(AppContext)

  const requestToServerGet = async () => {
    try {
      const userAlarmData = await axios.get(`${SERVER_ADDRESS}user/alert`, {
        headers: {
          Authorization: `${localStorage.getItem('accessToken')}`,
        },
      })
      usersInfo.setIsAlarmData(false)
      listDatas.setAlarmData(userAlarmData.data)
    } catch (error: any) {
      if (error.response) {
        switch (error.response.data.message) {
          case 'DECODE_ERROR':
            appContext.setToastIcon([<FcHighPriority key="1" className="text-2xl" />])
            appContext.setToastMessage([`You don't have permission`])
            break
          default:
            appContext.setToastIcon([<FcHighPriority key="1" className="text-2xl" />])
            appContext.setToastMessage(['Request Error'])
            break
        }
      }
    }
  }

  useEffect(() => {
    requestToServerGet()
  }, [])

  return <></>
})

export default AlarmData
