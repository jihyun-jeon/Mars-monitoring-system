import { useLoadScript } from '@react-google-maps/api'
import { Observer } from 'mobx-react'
import { useEffect, useState, useMemo } from 'react'
import { BiArrowBack } from 'react-icons/bi'
import { Link } from 'react-router-dom'

import GoogleMap_ from '../../../src/components/googleMap/GoogleMap_'
import DetailInfo from '../../components/detailInfo/DetailInfo'
import DetailList from '../../components/detailList/DetailList'
import Modal from '../../components/modal/modal'
import useStore from '../../useStore'
import EquipEdit from './components/EquipEdit'

interface onModalType {
  clicked: boolean
  childrun: null | any
}

const EquipmentDetail = () => {
  const [equipmentData, setEquipmentData] = useState({})
  const [onModal, setOnModal] = useState<onModalType>({ clicked: false, childrun: null })

  const center = useMemo(() => ({ lat: 33.402374, lng: 126.582381 }), [])

  const { usersInfo } = useStore()

  useEffect(() => {
    fetch('/public/data/equipment_detail.json')
      .then((res) => res.json())
      .then((result) => setEquipmentData(result))
  }, [])

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyA-14N8FNLXVKB9NeF1eSnYYq8pItkBUaI',
  })

  return (
    <Observer>
      {() => (
        <div className="h-screen w-full overflow-scroll px-3 pt-5">
          <div>
            <p className="mb-3 flex">
              <button
                type="button"
                className="flexCenter mr-3 h-12 w-12 rounded-[50%] bg-primary text-4xl text-white"
              >
                <Link to="/equipmentList">
                  <BiArrowBack />
                </Link>
              </button>
              <span className="text-4xl font-bold">F01-0541</span>
            </p>
            <div className="flex justify-between">
              <img src="/public/imgs/equip.png" className="h-90 w-[33%] rounded-xl" />
              <div>
                {!isLoaded ? (
                  'Loading...'
                ) : (
                  <GoogleMap_
                    mapData={mapData}
                    center={center}
                    mapOption={google.maps.MapTypeId.ROADMAP}
                    mapContainerStyle={{
                      width: '68rem',
                      height: '24rem',
                      borderRadius: '10px',
                      marginRight: '40px',
                    }}
                  />
                )}
              </div>
            </div>
          </div>

          <DetailInfo usersInfo={usersInfo} setOnModal={setOnModal} EquipEdit={EquipEdit} />

          <DetailList usersInfo={usersInfo} setOnModal={setOnModal} />
          {onModal.clicked && <Modal contents={onModal.childrun} />}
        </div>
      )}
    </Observer>
  )
}

export default EquipmentDetail

const mapData = [
  { lat: 33.440689, lng: 126.920708, name: 'welding', active: true, error: true },
  { lat: 33.349512, lng: 126.611391, name: 'dump', active: false, error: false },
  { lat: 33.494913, lng: 126.897931, name: 'conveyer', active: true, error: true },
  { lat: 33.242565, lng: 126.553494, name: 'crain', active: true, error: false },
  { lat: 33.476915, lng: 126.805685, name: 'welding', active: false, error: false },
  { lat: 33.338557, lng: 126.459511, name: 'dump', active: true, error: true },
  { lat: 33.462374, lng: 126.742381, name: 'conveyer', active: true, error: false },
  { lat: 33.246541, lng: 126.401018, name: 'crain', active: false, error: false },
]
