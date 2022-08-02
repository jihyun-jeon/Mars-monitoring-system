import { AiFillHome } from 'react-icons/ai'
import { NavLink } from 'react-router-dom'

import { useToggle } from '../../hooks/useHandleToggle'
import AlarmInterface from './components/alarmInterface/AlarmInterface'
import AlarmModal from './components/alarmModal/AlarmModal'
import CurrentPath from './components/currentPath/CurrentPath'

const TopNav = () => {
  const [isToggle, handleToggle] = useToggle(false)

  return (
    <>
      <nav className="relative top-0 left-0 right-0 mb-4 flex h-20 justify-between bg-bgPaper px-12">
        <div className="relative right-[1rem] flex items-center">
          <NavLink to="/home">
            <AiFillHome className="mr-2 text-2xl text-primary" />
          </NavLink>
          <CurrentPath />
        </div>
        <AlarmInterface handleToggle={handleToggle} />
        {isToggle && <AlarmModal />}
      </nav>
      <div className="absolute top-20 right-0 w-screen border-t-4" />
    </>
  )
}

export default TopNav
