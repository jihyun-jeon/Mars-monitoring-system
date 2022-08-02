import { observer } from 'mobx-react'
import { AiFillAppstore } from 'react-icons/ai'
import { GiMineTruck } from 'react-icons/gi'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import { RiTaxiWifiLine } from 'react-icons/ri'
import { VscTools } from 'react-icons/vsc'
import { NavLink } from 'react-router-dom'

import useStore from '../../../../useStore'

type Props = {
  handleArrowToggle: () => void
}

const ContractionNav = observer(({ handleArrowToggle }: Props) => {
  const { usersInfo } = useStore()
  const { isEquipmentControl } = usersInfo

  return (
    <aside className="mr-4 h-screen w-28">
      <div className="h-full bg-primary py-4 px-3">
        <ul className="space-y-2">
          <li className="flex h-[4.5rem] justify-center">
            <MdOutlineKeyboardArrowRight
              onClick={handleArrowToggle}
              className="relative top-2 cursor-pointer text-3xl text-[#BAC7D5]"
            />
          </li>
          <li>
            <NavLink
              to="/home"
              className={({ isActive }) =>
                isActive
                  ? 'activeDetailIcon'
                  : 'flex items-center justify-center rounded-lg p-4 text-base font-normal text-bgPaper hover:bg-[#ffffff1a]'
              }
            >
              <AiFillAppstore className="text-2xl" />
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/equipmentList"
              className={({ isActive }) =>
                isActive
                  ? 'activeDetailIcon'
                  : 'flex items-center justify-center rounded-lg p-4 text-base font-normal text-bgPaper hover:bg-[#ffffff1a]'
              }
            >
              <GiMineTruck className="text-2xl" />
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/deviceList"
              className={({ isActive }) =>
                isActive
                  ? 'activeDetailIcon'
                  : 'flex items-center justify-center rounded-lg p-4 text-base font-normal text-bgPaper hover:bg-[#ffffff1a]'
              }
            >
              <RiTaxiWifiLine className="text-2xl" />
            </NavLink>
          </li>
          {isEquipmentControl && (
            <li>
              <NavLink
                to="/adminMapping"
                className={({ isActive }) =>
                  isActive
                    ? 'activeDetailIcon'
                    : 'flex items-center justify-center rounded-lg p-4 text-base font-normal text-bgPaper hover:bg-[#ffffff1a]'
                }
              >
                <VscTools className="text-2xl" />
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </aside>
  )
})

export default ContractionNav
