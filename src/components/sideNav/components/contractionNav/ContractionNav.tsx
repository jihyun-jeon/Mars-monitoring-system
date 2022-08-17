import { observer } from 'mobx-react'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import { VscTools } from 'react-icons/vsc'

import useStore from '../../../../useStore'
import contractionMenuTabData from '../../data/contractionMenuTabData'
import ContractionMenuTab from '../contractionMenuTab/ContractionMenuTab'

const ContractionNav = observer(() => {
  const { usersInfo, isSideNavToggle } = useStore()

  const arrowToggleSwitch = () => {
    isSideNavToggle.setIsArrowToggle(!isSideNavToggle.isArrowToggle)
  }

  return (
    <aside className="mr-4 h-screen w-28">
      <div className="h-full bg-primary py-4 px-3">
        <ul className="space-y-2">
          <li className="flex h-[4.5rem] justify-center">
            <MdOutlineKeyboardArrowRight
              onClick={arrowToggleSwitch}
              className="relative top-2 cursor-pointer text-3xl text-[#BAC7D5]"
            />
          </li>

          {contractionMenuTabData.map((menu) => {
            return (
              <ContractionMenuTab
                key={menu.id}
                connect={menu.to}
                activeClassName={menu.activeClassName}
                icon={menu.icon}
                content={menu.content}
              />
            )
          })}
          {usersInfo.isEquipmentControl && (
            <ContractionMenuTab
              connect="/adminMapping"
              activeClassName="activeDetailIcon"
              icon={<VscTools className="text-2xl" />}
              content={null}
            />
          )}
        </ul>
      </div>
    </aside>
  )
})

export default ContractionNav
