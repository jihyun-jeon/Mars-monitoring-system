import { observer } from 'mobx-react'
import { AiFillAppstore } from 'react-icons/ai'
import { GiMineTruck } from 'react-icons/gi'
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowLeft } from 'react-icons/md'
import { RiTaxiWifiLine } from 'react-icons/ri'
import { VscTools } from 'react-icons/vsc'
import { NavLink } from 'react-router-dom'

import { useToggle } from '../../../../hooks/useHandleToggle'
import useStore from '../../../../useStore'

type Props = {
  isArrowToggle: boolean
  handleArrowToggle: () => void
}

const DetailNav = observer(({ isArrowToggle, handleArrowToggle }: Props) => {
  const [isEquipmentDropDown, handleEquipmentDropDown] = useToggle(false)
  const [isDeviceDropDown, handleDeviceDropDown] = useToggle(false)
  const [isAdminDropDown, handleAdminDropDown] = useToggle(false)

  const { usersInfo } = useStore()
  const { isEquipmentControl } = usersInfo

  return (
    <aside className="mr-4 h-screen w-64">
      <div className="h-full bg-primary py-4 px-3">
        <ul className="space-y-2">
          <li className="flex h-[4.5rem] justify-between">
            <h1 className="relative top-1.5 text-3xl font-semibold text-white">Mars</h1>
            {isArrowToggle && (
              <MdOutlineKeyboardArrowLeft
                onClick={handleArrowToggle}
                className="relative top-2 cursor-pointer text-3xl text-[#BAC7D5]"
              />
            )}
          </li>
          <li>
            <NavLink
              to="/home"
              className={({ isActive }) =>
                isActive
                  ? 'activeNavLink'
                  : 'flex items-center rounded-lg p-2 text-base font-normal text-bgPaper hover:bg-[#ffffff1a]'
              }
            >
              <AiFillAppstore className="text-2xl" />
              <span className="ml-3">Home</span>
            </NavLink>
          </li>
          <li>
            <button
              onClick={handleEquipmentDropDown}
              type="button"
              className="group relative flex w-full items-center rounded-lg p-2 text-base font-normal text-bgPaper transition duration-75 hover:bg-[#ffffff1a] "
            >
              <GiMineTruck className="text-2xl" />
              <span className="ml-3 flex-1 whitespace-nowrap text-left">Equipment</span>
              {isEquipmentDropDown ? (
                <MdOutlineKeyboardArrowDown className="absolute -top-3 right-5 translate-x-1/2 translate-y-1/2 text-3xl" />
              ) : (
                <MdOutlineKeyboardArrowDown className="absolute -top-3 right-5 translate-x-1/2 translate-y-1/2 rotate-180 text-3xl" />
              )}
            </button>
            {isEquipmentDropDown && (
              <ul className="space-y-2 py-2">
                <li>
                  <NavLink
                    to="/equipmentList"
                    className={({ isActive }) =>
                      isActive
                        ? 'activeDetailNavLink'
                        : 'flex w-full cursor-pointer items-center rounded-lg p-2 pl-11 text-base font-normal text-white transition duration-75 hover:bg-[#ffffff1a]'
                    }
                  >
                    List
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
          <li>
            <button
              onClick={handleDeviceDropDown}
              type="button"
              className="group relative flex w-full items-center rounded-lg p-2 text-base font-normal text-bgPaper transition duration-75 hover:bg-[#ffffff1a] "
            >
              <RiTaxiWifiLine className="text-2xl" />
              <span className="ml-3 flex-1 whitespace-nowrap text-left">Device</span>
              {isDeviceDropDown ? (
                <MdOutlineKeyboardArrowDown className="absolute -top-3 right-5 translate-x-1/2 translate-y-1/2 text-3xl" />
              ) : (
                <MdOutlineKeyboardArrowDown className="absolute -top-3 right-5 translate-x-1/2 translate-y-1/2 rotate-180 text-3xl" />
              )}
            </button>
            {isDeviceDropDown && (
              <ul className="space-y-2 py-2">
                <li>
                  <NavLink
                    to="/deviceList"
                    className={({ isActive }) =>
                      isActive
                        ? 'activeDetailNavLink'
                        : 'flex w-full cursor-pointer items-center rounded-lg p-2 pl-11 text-base font-normal text-white transition duration-75 hover:bg-[#ffffff1a]'
                    }
                  >
                    List
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
          <li>
            {isEquipmentControl && (
              <button
                onClick={handleAdminDropDown}
                type="button"
                className="group relative flex w-full items-center rounded-lg p-2 text-base font-normal text-bgPaper transition duration-75 hover:bg-[#ffffff1a] "
              >
                <VscTools className="text-2xl" />
                <span className="ml-3 flex-1 whitespace-nowrap text-left">Admin</span>
                {isAdminDropDown ? (
                  <MdOutlineKeyboardArrowDown className="absolute -top-3 right-5 translate-x-1/2 translate-y-1/2 text-3xl" />
                ) : (
                  <MdOutlineKeyboardArrowDown className="absolute -top-3 right-5 translate-x-1/2 translate-y-1/2 rotate-180 text-3xl" />
                )}
              </button>
            )}
            {isAdminDropDown && (
              <ul className="space-y-2 py-2">
                <NavLink
                  to="/adminMapping"
                  className={({ isActive }) =>
                    isActive
                      ? 'activeDetailNavLink'
                      : 'flex w-full cursor-pointer items-center rounded-lg p-2 pl-11 text-base font-normal text-white transition duration-75 hover:bg-[#ffffff1a]'
                  }
                >
                  Mapping
                </NavLink>
                <li>
                  <NavLink
                    to="/adminHistory"
                    className={({ isActive }) =>
                      isActive
                        ? 'activeDetailNavLink'
                        : 'flex w-full cursor-pointer items-center rounded-lg p-2 pl-11 text-base font-normal text-white transition duration-75 hover:bg-[#ffffff1a]'
                    }
                  >
                    History
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </aside>
  )
})

export default DetailNav
