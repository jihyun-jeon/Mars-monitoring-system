import { observer } from 'mobx-react'
import { useEffect } from 'react'
import { useLocation } from 'react-router'

import useStore from '../../../../useStore'

const CurrentPath = observer(() => {
  const { pathNumbers } = useStore()

  const location = useLocation()
  const pathData = location.pathname.slice(1)

  const pathValidator = {
    home: pathData.indexOf('home') !== -1,
    equipmentList: pathData.indexOf('equipmentList') !== -1,
    equipmentDetail: pathData.indexOf('equipmentDetail') !== -1,
    deviceList: pathData.indexOf('deviceList') !== -1,
    deviceDetail: pathData.indexOf('deviceDetail') !== -1,
    adminMapping: pathData.indexOf('adminMapping') !== -1,
    adminHistory: pathData.indexOf('adminHistory') !== -1,
  }

  const handlePathName = () => {
    const {
      home,
      equipmentList,
      equipmentDetail,
      deviceList,
      deviceDetail,
      adminMapping,
      adminHistory,
    } = pathValidator

    if (home) {
      pathNumbers.setFrontPathName('Home')
    } else if (equipmentDetail) {
      pathNumbers.setFrontPathName('Equipment')
      pathNumbers.setMidPathName('List')
    } else if (equipmentList) {
      pathNumbers.setFrontPathName('Equipment')
      pathNumbers.setMidPathName('List')
    } else if (deviceDetail) {
      pathNumbers.setFrontPathName('Device')
      pathNumbers.setMidPathName('List')
    } else if (deviceList) {
      pathNumbers.setFrontPathName('Device')
      pathNumbers.setMidPathName('List')
    } else if (adminMapping) {
      pathNumbers.setFrontPathName('Admin')
      pathNumbers.setMidPathName('Mapping')
    } else if (adminHistory) {
      pathNumbers.setFrontPathName('Admin')
      pathNumbers.setMidPathName('History')
    }
  }

  useEffect(() => {
    pathNumbers.setFrontPathName(pathData)
    pathNumbers.setMidPathName(pathData)
    handlePathName()
  }, [pathData])

  return (
    <>
      <span className="mr-2 cursor-default text-[#BAC7D5]">&gt;</span>
      <span className="cursor-default text-xl">{pathNumbers.frontPathName}</span>
      {!pathValidator.home && (
        <>
          <span className="mx-2 cursor-default text-[#BAC7D5]">&gt;</span>
          <span className="cursor-default text-xl">{pathNumbers.midPathName}</span>
          {(!pathValidator.equipmentList || pathValidator.equipmentDetail) &&
            (!pathValidator.deviceList || pathValidator.deviceDetail) &&
            !pathValidator.adminMapping &&
            !pathValidator.adminHistory && (
              <>
                <span className="mx-2 cursor-default text-[#BAC7D5]">&gt;</span>
                <span className="cursor-default text-xl">{pathNumbers.equipmentNumber}</span>
              </>
            )}
        </>
      )}
    </>
  )
})

export default CurrentPath
