import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'

import DetailList from '../../components/detailList/DetailList'
import Modal from '../../components/modal/modal'
import { SERVER_ADDRESS } from '../../config'
import useStore from '../../useStore'
import DetailInfo from './components/DeviceInfo'

interface onModalType {
  clicked: boolean
  childrun: null | any
}

const DeviceDetail = observer(() => {
  const [onModal, setOnModal] = useState<onModalType>({ clicked: false, childrun: null })

  const { deviceDetailData } = useStore()
  const { id } = useParams()

  useEffect(() => {
    // fetch('/public/data/deviceDetail/gps_tracker.json')
    fetch(`${SERVER_ADDRESS}device/detail/${id}`)
      .then((res) => res.json())
      .then((result) => {
        // console.log(result)
        deviceDetailData.setDeviceData(result.results)
      })
  }, [])

  return (
    <div className="h-screen w-full overflow-scroll px-3 pt-5">
      <h1 className="ml-10 mb-[-75px] text-4xl">Device Detail</h1>
      <DetailInfo setOnModal={setOnModal} />
      {deviceDetailData.deviceData && <DetailList setOnModal={setOnModal} />}

      {onModal.clicked && <Modal contents={onModal.childrun} />}
    </div>
  )
})

export default DeviceDetail
