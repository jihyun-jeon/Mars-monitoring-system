import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import DetailInfo from '../../components/detailInfo/DetailInfo'
import DetailList from '../../components/detailList/DetailList'
import Modal from '../../components/modal/modal'
import useStore from '../../useStore'
import DeviceEdit from '../deviceDetail/components/DeviceEdit'

interface onModalType {
  clicked: boolean
  childrun: null | any
}

const DeviceDetail = observer(() => {
  const [deviceData, setDeviceData] = useState({})
  const [onModal, setOnModal] = useState<onModalType>({ clicked: false, childrun: null })

  const { usersInfo } = useStore()

  // useEffect(() => {
  //   fetch('/public/data/equipment_detail.json')
  //     .then((res) => res.json())
  //     .then((result) => setDeviceData(result))
  // }, [])

  return (
    <div className="h-screen w-full overflow-scroll px-3 pt-5">
      <h1 className="ml-10 mb-[-75px] text-4xl">Device Detail</h1>
      <DetailInfo usersInfo={usersInfo} setOnModal={setOnModal} EditComp={DeviceEdit} />
      <DetailList usersInfo={usersInfo} setOnModal={setOnModal} fatherComp={'deviceDetail'} />
      {onModal.clicked && <Modal contents={onModal.childrun} />}
    </div>
  )
})

export default DeviceDetail
