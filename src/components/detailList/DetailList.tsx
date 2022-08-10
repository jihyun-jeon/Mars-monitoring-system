import { toJS } from 'mobx'
import { Observer } from 'mobx-react'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'

import EquipInstallLog from '../../pages/equipmentDetail/components/EquipInstallLog'
import EquipLogAdd from '../../pages/equipmentDetail/components/EquipLogAdd'
import EquipRepairLog from '../../pages/equipmentDetail/components/EquipRepairLog'
import useStore from '../../useStore'

const DetailList = ({ setOnModal }) => {
  let [clicked, setClicked] = useState('0')
  const location = useLocation().pathname
  const nowPage = location.includes('equipment')

  const { usersInfo } = useStore()

  return (
    <Observer>
      {() => (
        <div className="px-10">
          <div className="flex justify-between">
            <div className="flex">
              {titleArr.map((el, idx) => {
                if (nowPage && idx === titleArr.length - 1) {
                  return
                }
                return (
                  <button
                    key={idx}
                    value={idx}
                    onClick={(e) => {
                      clicked = `${(e.target as HTMLButtonElement).value}`
                      setClicked(clicked)
                    }}
                    className={`${
                      `${idx}` === clicked ? 'bg-[#EFF2F5]' : ''
                    } border-gray my-auto mx-0 rounded-t-lg border-[1px] px-8 py-4 text-lg`}
                  >
                    {el}
                  </button>
                )
              })}
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

          {clicked === '0' ? (
            <EquipRepairLog setOnModal={setOnModal} />
          ) : (
            <EquipInstallLog setOnModal={setOnModal} />
          )}

          {/* page nation */}
          <div className="flexCenter relative w-full pb-28 pt-10">
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

const titleArr = ['수리', '설치', '교체']
