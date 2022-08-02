import { AiFillHome } from 'react-icons/ai'
import { BsFillBellFill } from 'react-icons/bs'
import { FaRegUserCircle } from 'react-icons/fa'
import { useLocation } from 'react-router'

import { useToggle } from '../../hooks/useHandleToggle'
import AlarmModal from './components/alarmModal/AlarmModal'

const TopNav = () => {
  const [isToggle, handleToggle] = useToggle(false)

  // 추후 손 볼 곳
  const location = useLocation()
  const pathName = location.pathname.slice(1)

  return (
    <>
      <nav className="relative top-0 left-0 right-0 mb-4 flex h-20 justify-between bg-bgPaper px-12">
        <div className="relative right-[1rem] flex items-center">
          <AiFillHome className="mr-2 text-2xl text-primary" />
          <span className="mr-2 text-[#BAC7D5]">&gt;</span>
          <button className="text-xl">{pathName}</button>
        </div>
        <div className="relative flex items-center">
          <p className="text-lg font-semibold text-dot4">이상 징후 알람이 전송되었습니다</p>
          <div className="relative">
            <BsFillBellFill className="ml-4 text-2xl" />
            <button
              onClick={handleToggle}
              className="absolute -top-2 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-dot4 text-lg text-bgPaper"
            >
              1
            </button>
          </div>
          <FaRegUserCircle className="ml-4 text-3xl" />
        </div>
        {isToggle && <AlarmModal handleToggle={handleToggle} />}
      </nav>
      <div className="absolute top-20 right-0 w-screen border-t-4" />
    </>
  )
}

export default TopNav
