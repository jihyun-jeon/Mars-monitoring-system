import { useLoadScript } from '@react-google-maps/api'
import { toJS } from 'mobx'
import { Observer } from 'mobx-react'
import { useEffect, useState, useMemo } from 'react'
import { BiArrowBack } from 'react-icons/bi'
import { CgTrash } from 'react-icons/cg'
import { Link } from 'react-router-dom'

import GoogleMap_ from '../../../src/components/googleMap/GoogleMap_'
import Modal from '../../components/modal/modal'
import useStore from '../../useStore'
import EquipEdit from './components/EquipEdit'
import EquipLogAdd from './components/EquipLogAdd'

const mapData = [
  { lat: 33.440689, lng: 126.920708, name: 'welding', active: true, error: true },
  { lat: 33.349512, lng: 126.611391, name: 'dump', active: false, error: false },
  { lat: 33.494913, lng: 126.897931, name: 'conveyer', active: true, error: true }, //
  { lat: 33.242565, lng: 126.553494, name: 'crain', active: true, error: false },
  { lat: 33.476915, lng: 126.805685, name: 'welding', active: false, error: false },
  { lat: 33.338557, lng: 126.459511, name: 'dump', active: true, error: true },
  { lat: 33.462374, lng: 126.742381, name: 'conveyer', active: true, error: false },
  { lat: 33.246541, lng: 126.401018, name: 'crain', active: false, error: false }, //
]

const EquipmentDetail = () => {
  const [equipmentData, setEquipmentData] = useState({})
  const [onModal, setOnModal] = useState({ clicked: false, content: '' })
  const [tapClicked, setTapClicked] = useState(true)

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
        <div className="h-screen w-full overflow-scroll px-10 pt-5">
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
              <p>
                {!isLoaded ? (
                  'Loading...'
                ) : (
                  <GoogleMap_
                    mapData={mapData}
                    center={center}
                    mapOption={google.maps.MapTypeId.ROADMAP}
                    mapContainerStyle={{
                      width: '67rem',
                      height: '23rem',
                      borderRadius: '10px',
                      marginRight: '40px',
                    }}
                  />
                )}
              </p>
            </div>
          </div>

          <div className="relative mt-5">
            {toJS(usersInfo)._isEquipmentControl && (
              <p className="absolute right-10">
                <button
                  type="button"
                  className="mt-4 mr-3 h-10 w-32 rounded-lg bg-primary text-xl text-white"
                >
                  Unmatched
                </button>
                <button
                  type="button"
                  name="edit"
                  className="mb-5 h-10 w-32 rounded-lg  bg-primary text-xl text-white"
                  onClick={(e) => {
                    const btnName = (e.target as HTMLButtonElement).name
                    setOnModal({ clicked: true, content: btnName })
                  }}
                >
                  Edit
                </button>
              </p>
            )}
            <div className=" p-14">
              <ul className="grid w-full grid-cols-4 pb-10">
                <li>
                  <p className="font-extrabold">Name</p>
                  <p>Drill Machine</p>
                </li>
                <li>
                  <p className="font-extrabold">Name</p>
                  <p>Drill Machine</p>
                </li>
                <li>
                  <p className="font-extrabold">Name</p>
                  <p>Drill Machine</p>
                </li>
                <li>
                  <p className="font-extrabold">Name</p>
                  <p>Drill Machine</p>
                </li>
              </ul>
              <ul className="grid w-full grid-cols-4 pb-10">
                <li>
                  <p className="font-extrabold">Name</p>
                  <p>Drill Machine</p>
                </li>
                <li>
                  <p className="font-extrabold">Name</p>
                  <p>Drill Machine</p>
                </li>
                <li>
                  <p className="font-extrabold">Name</p>
                  <p>Drill Machine</p>
                </li>
                <li>
                  <p className="font-extrabold">Name</p>
                  <p>Drill Machine</p>
                </li>
              </ul>
              <ul className="grid w-full grid-cols-4 pb-10">
                <li>
                  <p className="font-extrabold">Name</p>
                  <p>Drill Machine</p>
                </li>
                <li>
                  <p className="font-extrabold">Name</p>
                  <p>Drill Machine</p>
                </li>
                <li>
                  <p className="font-extrabold">Name</p>
                  <p>Drill Machine</p>
                </li>
                <li>
                  <p className="font-extrabold">Name</p>
                  <p>Drill Machine</p>
                </li>
              </ul>
              <ul className="grid w-full grid-cols-4 pb-10">
                <li>
                  <p className="font-extrabold">Name</p>
                  <p>Drill Machine</p>
                </li>
                <li>
                  <p className="font-extrabold">Name</p>
                  <p>Drill Machine</p>
                </li>
                <li>
                  <p className="font-extrabold">Name</p>
                  <p>Drill Machine</p>
                </li>
                <li>
                  <p className="font-extrabold">Name</p>
                  <p>Drill Machine</p>
                </li>
              </ul>
            </div>
          </div>

          <div className="px-10">
            <div className="flex justify-between">
              <div className="flex">
                <button
                  onClick={() => setTapClicked(true)}
                  className={`${
                    tapClicked ? 'bg-[#EFF2F5]' : ''
                  } border-gray my-auto mx-0 rounded-t-lg border-[1px]  px-8 py-4 text-lg`}
                >
                  수리
                </button>
                <button
                  onClick={() => setTapClicked(false)}
                  className={`${
                    tapClicked ? '' : 'bg-[#EFF2F5]'
                  } border-gray my-auto mx-0 rounded-t-lg border-[1px] px-8 py-4 text-lg`}
                >
                  설치
                </button>
              </div>
              {toJS(usersInfo)._isEquipmentControl && (
                <button
                  type="button"
                  name="add"
                  className="mb-5 mr-2 h-10 w-32 rounded-lg bg-primary text-xl text-white"
                  onClick={(e) => {
                    const btnName = (e.target as HTMLButtonElement).name
                    setOnModal({ clicked: true, content: btnName })
                  }}
                >
                  Add
                </button>
              )}
            </div>

            <table className="w-full  border-2">
              <tbody>
                <tr className="flexCenter grid  h-10 grid-cols-5 border-b bg-[#EFF2F5]">
                  <th className="">Device ID</th>
                  <th className="">Matched Equipment</th>
                  <th className="">Company</th>
                  <th className="">Equipment Name</th>
                  <th className="">Equipment Type</th>
                </tr>

                <tr className="flexCenter grid h-10 grid-cols-5 border-b text-center">
                  <td>SE-VL-011-0000</td>
                  <td>DUMMY-012-000</td>
                  <td>AAE</td>
                  <td>TruckCar</td>
                  <td className="relative">
                    CargoTruck
                    {toJS(usersInfo)._isEquipmentControl && (
                      <span className="absolute right-5">
                        <CgTrash style={{ color: 'red' }} />
                      </span>
                    )}
                  </td>
                </tr>

                <tr className="flexCenter grid h-10 grid-cols-5 border-b text-center">
                  <td>body1</td>
                  <td>body1</td>
                  <td>body1</td>
                  <td>body1</td>
                  <td>body1</td>
                </tr>

                <tr className="flexCenter grid h-10 grid-cols-5 border-b text-center">
                  <td>body</td>
                  <td>body</td>
                  <td>body</td>
                  <td>body</td>
                  <td className="relative">
                    body
                    {toJS(usersInfo)._isEquipmentControl && (
                      <span className="absolute right-5">
                        <CgTrash style={{ color: 'red' }} />
                      </span>
                    )}
                  </td>
                </tr>

                <tr className="flexCenter grid h-10 grid-cols-5 border-b text-center">
                  <td>body</td>
                  <td>body</td>
                  <td>body</td>
                  <td>body</td>
                  <td>body</td>
                </tr>
                <tr className="flexCenter grid h-10 grid-cols-5 border-b text-center">
                  <td>body</td>
                  <td>body</td>
                  <td>body</td>
                  <td>body</td>
                  <td>body</td>
                </tr>

                <tr className="flexCenter grid h-10 grid-cols-5 border-b text-center">
                  <td>body</td>
                  <td>body</td>
                  <td>body</td>
                  <td>body</td>
                  <td className="relative">
                    body
                    {toJS(usersInfo)._isEquipmentControl && (
                      <span className="absolute right-5">
                        <CgTrash style={{ color: 'red' }} />
                      </span>
                    )}
                  </td>
                </tr>

                <tr className="flexCenter grid h-10 grid-cols-5 border-b text-center">
                  <td>body</td>
                  <td>body</td>
                  <td>body</td>
                  <td>body</td>
                  <td>body</td>
                </tr>
                <tr className="flexCenter grid h-10 grid-cols-5 border-b text-center">
                  <td>body</td>
                  <td>body</td>
                  <td>body</td>
                  <td>body</td>
                  <td>body</td>
                </tr>

                <tr className="flexCenter grid h-10 grid-cols-5 border-b text-center">
                  <td>body</td>
                  <td>body</td>
                  <td>body</td>
                  <td>body</td>
                  <td>body</td>
                </tr>

                <tr className="flexCente grid h-10 grid-cols-5 border-b text-center">
                  <td>body</td>
                  <td>body</td>
                  <td>body</td>
                  <td>body</td>
                  <td>body</td>
                </tr>
              </tbody>
            </table>

            {/* page nation */}
            <div className="flexCenter relative w-full py-5">
              {/* page select */}
              <div className="absolute right-5">
                <span className="mr-5">Rows per page</span>
                <select className="mr-5 w-12">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
              </div>
              <div className="flex">
                <button type="button" className="mx-5">
                  &lt;
                </button>
                <ul className="flex">
                  <li className="flexCenter w-5">1</li>
                  <li className="flexCenter w-5">2</li>
                  <li className="flexCenter w-5">3</li>
                  <li className="flexCenter w-5">4</li>
                  <li className="flexCenter w-5">5</li>
                </ul>
                <button type="button" className="mx-5">
                  &gt;
                </button>
              </div>
            </div>
          </div>
          {onModal.clicked && (
            <Modal
              setOnModal={setOnModal}
              contents={
                onModal.content === 'edit' ? (
                  <EquipEdit setOnModal={setOnModal} />
                ) : (
                  <EquipLogAdd setOnModal={setOnModal} />
                )
              }
            />
          )}
        </div>
      )}
    </Observer>
  )
}

export default EquipmentDetail
