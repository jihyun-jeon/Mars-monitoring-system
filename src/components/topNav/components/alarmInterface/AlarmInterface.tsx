import { observer } from 'mobx-react-lite'
import { BsFillBellFill } from 'react-icons/bs'
import { FaRegUserCircle } from 'react-icons/fa'

import useStore from '../../../../useStore'
import LogoutModal from '../logoutModal/LogoutModal'

const AlarmInterface = observer(() => {
  const { listDatas, isTopNavIsToggle } = useStore()

  // logout check modal on/off
  const checkLogoutOnModal = () => {
    isTopNavIsToggle.setIsCheckLogout(!isTopNavIsToggle.isCheckLogout)
  }

  // alarm bell Modal on/off
  const alarmMessageModalToggle = () => {
    isTopNavIsToggle.setIsAlarmMessageToggle(!isTopNavIsToggle.isAlarmMessageToggle)
  }
  return (
    <div className="relative left-4 flex items-center">
      <p className="text-lg font-semibold text-dot4"></p>
      <div className="relative">
        <BsFillBellFill
          onClick={alarmMessageModalToggle}
          className="ml-4 cursor-pointer text-2xl"
        />
        <button
          onClick={alarmMessageModalToggle}
          className={
            listDatas.alarmData.length > 0
              ? 'absolute -top-2 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-dot4 text-lg text-bgPaper'
              : 'hidden'
          }
        >
          {listDatas.alarmData.length}
        </button>
      </div>
      <FaRegUserCircle className="mx-4 text-3xl" />
      {localStorage.getItem('accessToken') && (
        <button
          onClick={checkLogoutOnModal}
          className="rounded-[0.5rem] bg-primary px-4 py-1 text-lg font-semibold text-[#fff]"
        >
          Logout
        </button>
      )}
      {isTopNavIsToggle.isCheckLogout && <LogoutModal checkLogoutOnModal={checkLogoutOnModal} />}
    </div>
  )
})
export default AlarmInterface
