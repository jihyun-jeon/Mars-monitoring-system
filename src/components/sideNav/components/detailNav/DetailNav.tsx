import { observer } from 'mobx-react'
import { GiMineTruck } from 'react-icons/gi'
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowLeft } from 'react-icons/md'
import { RiTaxiWifiLine } from 'react-icons/ri'
import { VscTools } from 'react-icons/vsc'

import useStore from '../../../../useStore'
import {
  detailDownMenuTabAdmin,
  detailDownMenuTabDevice,
  detailDownMenuTabEquipment,
  detailMenuTabHome,
} from '../../data/detailMenuTabData'
import DetailDownMenuTab from '../detailDownMenuTab/DetailDownMenuTab'

const DetailNav = observer(() => {
  const { usersInfo, isSideNavToggle } = useStore()

  const arrowToggleSwitch = () => {
    isSideNavToggle.setIsArrowToggle(!isSideNavToggle.isArrowToggle)
  }

  const handleEquipmentDrop = () => {
    isSideNavToggle.setIsEquipmentDropDown(!isSideNavToggle.isEquipmentDropDown)
  }

  const handleDeviceDrop = () => {
    isSideNavToggle.setIsDeviceDropDown(!isSideNavToggle.isDeviceDropDown)
  }

  const handleAdminDrop = () => {
    isSideNavToggle.setIsAdminDropDown(!isSideNavToggle.isAdminDropDown)
  }

  return (
    <aside className="mr-4 h-screen w-64">
      <div className="h-full bg-primary py-4 px-3">
        <ul className="space-y-2">
          <li className="flex h-[4.5rem] justify-between">
            <h1 className="relative top-1.5 text-3xl font-semibold text-white">Mars</h1>
            {isSideNavToggle.isArrowToggle && (
              <MdOutlineKeyboardArrowLeft
                onClick={arrowToggleSwitch}
                className="relative top-2 cursor-pointer text-3xl text-[#BAC7D5]"
              />
            )}
          </li>

          {detailMenuTabHome.map((menu) => (
            <DetailDownMenuTab
              key={menu.id}
              connect={menu.to}
              activeClassName={menu.activeClassName}
              icon={menu.icon}
              content={menu.content}
              textClassName={menu.textClassName}
            />
          ))}

          <li>
            <button
              onClick={handleEquipmentDrop}
              type="button"
              className="group relative flex w-full items-center rounded-lg p-2 text-base font-normal text-bgPaper transition duration-75 hover:bg-[#ffffff1a] "
            >
              <GiMineTruck className="text-2xl" />
              <span className="ml-3 flex-1 whitespace-nowrap text-left">Equipment</span>
              {isSideNavToggle.isEquipmentDropDown ? (
                <MdOutlineKeyboardArrowDown className="absolute -top-3 right-5 translate-x-1/2 translate-y-1/2 text-3xl" />
              ) : (
                <MdOutlineKeyboardArrowDown className="absolute -top-3 right-5 translate-x-1/2 translate-y-1/2 rotate-180 text-3xl" />
              )}
            </button>
            {isSideNavToggle.isEquipmentDropDown && (
              <ul className="space-y-2 py-2">
                {detailDownMenuTabEquipment.map((menu) => (
                  <DetailDownMenuTab
                    key={menu.id}
                    connect={menu.to}
                    activeClassName={menu.activeClassName}
                    icon={null}
                    content={menu.content}
                    textClassName={menu.textClassName}
                  />
                ))}
              </ul>
            )}
          </li>

          <li>
            <button
              onClick={handleDeviceDrop}
              type="button"
              className="group relative flex w-full items-center rounded-lg p-2 text-base font-normal text-bgPaper transition duration-75 hover:bg-[#ffffff1a] "
            >
              <RiTaxiWifiLine className="text-2xl" />
              <span className="ml-3 flex-1 whitespace-nowrap text-left">Device</span>
              {isSideNavToggle.isDeviceDropDown ? (
                <MdOutlineKeyboardArrowDown className="absolute -top-3 right-5 translate-x-1/2 translate-y-1/2 text-3xl" />
              ) : (
                <MdOutlineKeyboardArrowDown className="absolute -top-3 right-5 translate-x-1/2 translate-y-1/2 rotate-180 text-3xl" />
              )}
            </button>
            {isSideNavToggle.isDeviceDropDown && (
              <ul className="space-y-2 py-2">
                {detailDownMenuTabDevice.map((menu) => (
                  <DetailDownMenuTab
                    key={menu.id}
                    connect={menu.to}
                    activeClassName={menu.activeClassName}
                    icon={null}
                    content={menu.content}
                    textClassName={menu.textClassName}
                  />
                ))}
              </ul>
            )}
          </li>

          <li>
            {usersInfo.isEquipmentControl && (
              <button
                onClick={handleAdminDrop}
                type="button"
                className="group relative flex w-full items-center rounded-lg p-2 text-base font-normal text-bgPaper transition duration-75 hover:bg-[#ffffff1a] "
              >
                <VscTools className="text-2xl" />
                <span className="ml-3 flex-1 whitespace-nowrap text-left">Admin</span>
                {isSideNavToggle.isAdminDropDown ? (
                  <MdOutlineKeyboardArrowDown className="absolute -top-3 right-5 translate-x-1/2 translate-y-1/2 text-3xl" />
                ) : (
                  <MdOutlineKeyboardArrowDown className="absolute -top-3 right-5 translate-x-1/2 translate-y-1/2 rotate-180 text-3xl" />
                )}
              </button>
            )}
            {isSideNavToggle.isAdminDropDown && (
              <ul className="space-y-2 py-2">
                {detailDownMenuTabAdmin.map((menu) => (
                  <DetailDownMenuTab
                    key={menu.id}
                    connect={menu.to}
                    activeClassName={menu.activeClassName}
                    icon={null}
                    content={menu.content}
                    textClassName={menu.textClassName}
                  />
                ))}
              </ul>
            )}
          </li>
        </ul>
      </div>
    </aside>
  )
})

export default DetailNav
