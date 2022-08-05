import { toJS } from 'mobx'
import { Observer } from 'mobx-react'
import { useState } from 'react'
import { CgTrash } from 'react-icons/cg'

import EquipLogAdd from '../../pages/equipmentDetail/components/EquipLogAdd'
import DeleteCheck from '../modal/components/DeleteCheck'

const DetailList = ({ usersInfo, setOnModal }) => {
  const [tapClicked, setTapClicked] = useState(true)

  return (
    <Observer>
      {() => (
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
                  setOnModal({ clicked: true, childrun: <EquipLogAdd setOnModal={setOnModal} /> })
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
                    <button
                      type="button"
                      className="absolute right-5"
                      onClick={(e) => {
                        const deleteApi = () =>
                          fetch('/public/data/equipmentList.json')
                            .then((res) => res.json())
                            .then((result) => console.log(result))

                        setOnModal({
                          clicked: true,
                          childrun: <DeleteCheck setOnModal={setOnModal} deleteApi={deleteApi} />,
                        })
                      }}
                    >
                      <CgTrash style={{ color: 'red' }} />
                    </button>
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
                  body4
                  {toJS(usersInfo)._isEquipmentControl && (
                    <button
                      type="button"
                      className="absolute right-5"
                      onClick={(e) => {
                        const deleteApi = () =>
                          fetch('/public/data/equipmentList.json')
                            .then((res) => res.json())
                            .then((result) => console.log(result))

                        setOnModal({
                          clicked: true,
                          childrun: <DeleteCheck setOnModal={setOnModal} deleteApi={deleteApi} />,
                        })
                      }}
                    >
                      <CgTrash style={{ color: 'red' }} />
                    </button>
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
                    <button
                      type="button"
                      className="absolute right-5"
                      onClick={(e) => {
                        const deleteApi = () =>
                          fetch('/public/data/equipmentList.json')
                            .then((res) => res.json())
                            .then((result) => console.log(result))

                        setOnModal({
                          clicked: true,
                          childrun: <DeleteCheck setOnModal={setOnModal} deleteApi={deleteApi} />,
                        })
                      }}
                    >
                      <CgTrash style={{ color: 'red' }} />
                    </button>
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
      )}
    </Observer>
  )
}

export default DetailList
