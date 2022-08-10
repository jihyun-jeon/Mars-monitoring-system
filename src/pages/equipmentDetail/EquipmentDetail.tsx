import { useLoadScript } from '@react-google-maps/api'
import { toJS } from 'mobx'
import { observer, Observer } from 'mobx-react'
import { useEffect, useState, useMemo } from 'react'
import { BiArrowBack } from 'react-icons/bi'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'

import GoogleMap_ from '../../../src/components/googleMap/GoogleMap_'
import DetailList from '../../components/detailList/DetailList'
import Modal from '../../components/modal/modal'
import useStore from '../../useStore'
import { SERVER_ADDRESS } from '.././../config'
import EquipEdit from './components/EquipEdit'
import EquipmentInfo from './components/EquipmentInfo'

interface onModalType {
  clicked: boolean
  childrun: null | any
}

const EquipmentDetail = observer(() => {
  const { detailDatas, usersInfo } = useStore()
  const { equipment } = detailDatas

  // console.log(toJS(equipment))

  const { _isEquipmentControl } = usersInfo
  const [onModal, setOnModal] = useState<onModalType>({ clicked: false, childrun: null })

  const { id } = useParams()

  const mapKey = import.meta.env.VITE_GOOGLE_MAP_KEY
  const center = useMemo(() => ({ lat: 33.402374, lng: 126.582381 }), [])

  useEffect(() => {
    fetch(`${SERVER_ADDRESS}equipment/${id}?offset=1`)
      .then((res) => res.json())
      .then((result) => {
        // console.log(result)
        detailDatas.setEquipment(result.equipment)
      })
  }, [])

  // useEffect(() => {
  //   fetch(`/data/equipmentDetail.json`)
  //     .then((res) => res.json())
  //     .then((result) => {
  //       detailDatas.setEquipment(result)
  //     })
  // }, [])

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: mapKey,
  })

  return (
    <div className="h-screen w-full overflow-scroll pl-10  pt-5">
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
          <span className="text-4xl font-bold">{equipment?.originalId}</span>
        </p>
        <div className="flexCenter h-[24rem] flex-row justify-between">
          <div className="flexCenter h-96 w-[43rem] flex-row rounded-lg border border-neutral-400">
            <img src="/public/imgs/equip.png" className="h-90 h-[18rem] w-[18rem] rounded-[50%]" />

            <div className="mt-10 ml-10 grid  h-48 w-80 grid-rows-[1fr_1fr_1fr_1fr]  bg-[white]">
              {equipment &&
                CardTitle.map((data: any, idx) => {
                  const keyData = `${Object.keys(data)[0]}`
                  const valueData = (equipment as any)[keyData]
                  const title = data[keyData]

                  let onOff = ''
                  if (keyData === 'isPower') {
                    onOff = (equipment as any)[keyData] ? 'on' : 'off'
                  }

                  let result = ''
                  switch (typeof valueData) {
                    case 'object':
                      result = valueData.name
                      break
                    case 'boolean':
                      result = onOff
                      break

                    default:
                      result = valueData
                      break
                  }

                  return (
                    <div className="flex" key={idx}>
                      <p className="mr-8 w-24 text-lg font-extrabold">{title}</p>
                      <p>{result}</p>
                    </div>
                  )
                })}
            </div>
          </div>
          <div>
            {!isLoaded ? (
              'Loading...'
            ) : (
              <GoogleMap_
                mapData={mapData}
                center={center}
                mapOption={google.maps.MapTypeId.ROADMAP}
                mapContainerStyle={{
                  width: '60rem',
                  height: '24rem',
                  borderRadius: '10px',
                  marginRight: '40px',
                }}
              />
            )}
          </div>
        </div>
      </div>

      {_isEquipmentControl && (
        <>
          <p className="flex  justify-end align-middle">
            <button
              type="button"
              className="mt-10 mr-3 h-10 w-32 rounded-lg bg-primary text-xl text-white"
            >
              Unmatched
            </button>
            <button
              type="button"
              name="edit"
              className="mt-10  mb-5 h-10 w-32 rounded-lg  bg-primary text-xl text-white"
              onClick={(e) => {
                setOnModal({ clicked: true, childrun: <EquipEdit setOnModal={setOnModal} /> })
              }}
            >
              Edit
            </button>
          </p>
          <div className="px-14 pb-20">
            <div className=" w-full py-5">{equipment && <EquipmentInfo />}</div>
          </div>
        </>
      )}

      {equipment && <DetailList setOnModal={setOnModal} />}

      {onModal.clicked && <Modal contents={onModal.childrun} />}
    </div>
  )
})

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

const CardTitle = [
  { equipmentCategory: 'Equipment' },
  { equipmentType: 'Type' },
  { qr_code: 'Qr code' },
  { isPower: 'Power' },
]
