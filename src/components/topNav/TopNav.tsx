import { observer } from 'mobx-react'
import { useContext, useEffect } from 'react'
import { AiFillHome } from 'react-icons/ai'
import { FcHighPriority } from 'react-icons/fc'
import { NavLink } from 'react-router-dom'

import AppContext from '../../AppContext'
import { instance } from '../../config'
import useStore from '../../useStore'
import AlarmInterface from './components/alarmInterface/AlarmInterface'
import AlarmModal from './components/alarmModal/AlarmModal'
import CurrentPath from './components/currentPath/CurrentPath'

const TopNav = observer(() => {
  const { listDatas, isTopNavIsToggle } = useStore()

  const appContext = useContext(AppContext)

  const requestToServerGetAlarmData = async () => {
    try {
      const userAlarmData = await instance.get('user/alert', {
        headers: {
          Authorization: `${localStorage.getItem('accessToken')}`,
        },
      })

      const { result } = userAlarmData.data

      if (result.rowBattery.length > 0 && result.networkError.length > 0) {
        listDatas.setAlarmData(result.rowBattery.concat(result.networkError))
      } else if (result.rowBattery.length > 0 && result.networkError.length === 0) {
        listDatas.setAlarmData(result.rowBattery)
      } else if (result.networkError.length > 0 && result.rowBattery.length === 0) {
        listDatas.setAlarmData(result.networkError)
      }

      isTopNavIsToggle.setIsAlarmLoadingToggle(false)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response) {
        switch (error.response.data.message) {
          case 'DECODE_ERROR':
            appContext.setToastIcon([<FcHighPriority key="1" className="text-2xl" />])
            appContext.setToastMessage([`You don't have permission`])
            break
          default:
            appContext.setToastIcon([<FcHighPriority key="1" className="text-2xl" />])
            appContext.setToastMessage(['The cause is unknown'])
            break
        }
      } else {
        appContext.setToastIcon([<FcHighPriority key="1" className="text-2xl" />])
        appContext.setToastMessage(['Failed to load alarm data.'])
      }
    }
  }

  useEffect(() => {
    requestToServerGetAlarmData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <nav className="relative top-1 left-0 right-0 mb-7 flex h-20 justify-between bg-bgPaper px-12">
        <div className="relative right-[1rem] flex items-center">
          <NavLink to="/home">
            <AiFillHome className="mr-2 text-2xl text-primary" />
          </NavLink>
          <CurrentPath />
        </div>
        <AlarmInterface />
        {isTopNavIsToggle.isAlarmMessageToggle && <AlarmModal />}
      </nav>
      <div className="absolute top-20 right-0 w-screen border-t-4" />
    </>
  )
})

export default TopNav
