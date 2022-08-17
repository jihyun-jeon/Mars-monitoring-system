import { AiFillAppstore } from 'react-icons/ai'
import { GiMineTruck } from 'react-icons/gi'
import { RiTaxiWifiLine } from 'react-icons/ri'

const contractionMenuTabData = [
  {
    id: 'home',
    to: '/home',
    activeClassName: 'activeDetailIcon',
    icon: <AiFillAppstore className="text-2xl" />,
    content: null,
  },
  {
    id: 'equipment',
    to: '/equipmentList',
    activeClassName: 'activeDetailIcon',
    icon: <GiMineTruck className="text-2xl" />,
    content: null,
  },
  {
    id: 'device',
    to: '/deviceList',
    activeClassName: 'activeDetailIcon',
    icon: <RiTaxiWifiLine className="text-2xl" />,
    content: null,
  },
]

export default contractionMenuTabData
