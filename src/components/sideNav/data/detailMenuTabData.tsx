import { AiFillAppstore } from 'react-icons/ai'

export const detailMenuTabHome = [
  {
    id: 1,
    to: '/home',
    activeClassName: 'activeNavLink',
    icon: <AiFillAppstore className="text-2xl" />,
    content: 'Home',
    textClassName: 'ml-3',
  },
]

export const detailDownMenuTabEquipment = [
  {
    id: 1,
    to: '/equipmentList',
    activeClassName: 'activeDetailNavLink',
    content: 'List',
    textClassName: 'ml-9',
  },
]

export const detailDownMenuTabDevice = [
  {
    id: 1,
    to: '/deviceList',
    activeClassName: 'activeDetailNavLink',
    content: 'List',
    textClassName: 'ml-9',
  },
]

export const detailDownMenuTabAdmin = [
  {
    id: 1,
    to: '/adminMapping',
    activeClassName: 'activeDetailNavLink',
    content: 'Mapping',
    textClassName: 'ml-9',
  },
  {
    id: 2,
    to: '/adminHistory',
    activeClassName: 'activeDetailNavLink',
    content: 'History',
    textClassName: 'ml-9',
  },
]
