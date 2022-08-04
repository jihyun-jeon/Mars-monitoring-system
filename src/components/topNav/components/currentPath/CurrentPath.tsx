import { useState, useEffect } from 'react'
import { useLocation } from 'react-router'

const CurrentPath = () => {
  const location = useLocation()
  const pathData = location.pathname.slice(1)

  const [frontPathName, setFrontPathName] = useState(pathData)
  const [midPathName, setMidPathName] = useState(pathData)

  const pathValidator = {
    home: pathData.indexOf('home') !== -1,
    equipmentList: pathData.indexOf('equipmentList') !== -1,
    equipmentDetail: pathData.indexOf('equipmentList/equipmentDetail') !== -1,
    equipmentTrand: pathData.indexOf('equipmentTrand') !== -1,
    deviceList: pathData.indexOf('deviceList') !== -1,
    deviceDetail: pathData.indexOf('deviceList/deviceDetail') !== -1,
    adminMapping: pathData.indexOf('adminMapping') !== -1,
    adminHistory: pathData.indexOf('adminHistory') !== -1,
  }

  const handlePathName = () => {
    const {
      home,
      equipmentList,
      equipmentDetail,
      equipmentTrand,
      deviceList,
      deviceDetail,
      adminMapping,
      adminHistory,
    } = pathValidator
    if (home) {
      setFrontPathName('Home')
    } else if (equipmentDetail) {
      setFrontPathName('Equipment')
      setMidPathName('List')
    } else if (equipmentList) {
      setFrontPathName('Equipment')
      setMidPathName('List')
    } else if (equipmentTrand) {
      setFrontPathName('Equipment')
      setMidPathName('Trand')
    } else if (deviceDetail) {
      setFrontPathName('Device')
      setMidPathName('List')
    } else if (deviceList) {
      setFrontPathName('Device')
      setMidPathName('List')
    } else if (adminMapping) {
      setFrontPathName('Admin')
      setMidPathName('Mapping')
    } else if (adminHistory) {
      setFrontPathName('Admin')
      setMidPathName('History')
    }
  }

  useEffect(() => {
    handlePathName()
  }, [pathData])

  return (
    <>
      <span className="mr-2 cursor-default text-[#BAC7D5]">&gt;</span>
      <span className="cursor-default text-xl">{frontPathName}</span>
      {!pathValidator.home && (
        <>
          <span className="mx-2 cursor-default text-[#BAC7D5]">&gt;</span>
          <span className="cursor-default text-xl">{midPathName}</span>
          {(!pathValidator.equipmentList || pathValidator.equipmentDetail) &&
            !pathValidator.equipmentTrand &&
            (!pathValidator.deviceList || pathValidator.deviceDetail) &&
            !pathValidator.adminMapping &&
            !pathValidator.adminHistory && (
              <>
                <span className="mx-2 cursor-default text-[#BAC7D5]">&gt;</span>
                <span className="cursor-default text-xl">Detail</span>
              </>
            )}
        </>
      )}
    </>
  )
}

export default CurrentPath
