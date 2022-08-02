import { useToggle } from '../../hooks/useHandleToggle'
import ContractionNav from './components/contractionNav/ContractionNav'
import DetailNav from './components/detailNav/DetailNav'

import './SideNav.css'

const SideNav = () => {
  const [isArrowToggle, handleArrowToggle] = useToggle(false)

  return (
    <>
      {isArrowToggle ? (
        <DetailNav isArrowToggle={isArrowToggle} handleArrowToggle={handleArrowToggle} />
      ) : (
        <ContractionNav handleArrowToggle={handleArrowToggle} />
      )}
    </>
  )
}

export default SideNav
