import { observer } from 'mobx-react'

import useStore from '../../useStore'
import ContractionNav from './components/contractionNav/ContractionNav'
import DetailNav from './components/detailNav/DetailNav'

import './SideNav.css'

const SideNav = observer(() => {
  const { isSideNavToggle } = useStore()

  return <>{isSideNavToggle.isArrowToggle ? <DetailNav /> : <ContractionNav />}</>
})

export default SideNav
