import { toJS } from 'mobx'
import { observer } from 'mobx-react'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'

import DeviceInstallLog from '../../pages/deviceDetail/components/DeviceInstallLog'
import DeviceRepairLog from '../../pages/deviceDetail/components/DeviceRepairLog'
import DeviceReplaceLog from '../../pages/deviceDetail/components/DeviceReplaceLog'
import EquipInstallLog from '../../pages/equipmentDetail/components/EquipInstallLog'
import EquipLogAdd from '../../pages/equipmentDetail/components/EquipLogAdd'
import EquipRepairLog from '../../pages/equipmentDetail/components/EquipRepairLog'
import useStore from '../../useStore'

const DetailList = observer(({ setOnModal }) => {
  let [clicked, setClicked] = useState('0')
  const location = useLocation().pathname
  const nowPage = location.includes('equipment')
  const nowPageName = location.split('/')[1]

  const { usersInfo } = useStore()

  return (
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
            disabled={clicked === '1'}
            className={`mb-5 mr-2 h-10 w-32 rounded-lg ${
              clicked === '1' ? 'cursor-not-allowed bg-blue-200' : 'bg-primary'
            } text-xl text-white`}
            onClick={(e) => {
              setOnModal({ clicked: true, childrun: <EquipLogAdd setOnModal={setOnModal} /> })
            }}
          >
            Add
          </button>
        )}
      </div>

      {/* {nowPageName === 'deviceDetail' && clicked === '0' ? (
        <DeviceRepairLog setOnModal={setOnModal} />
      ) : clicked === '1' ? (
        <DeviceInstallLog />
      ) : (
        <DeviceReplaceLog setOnModal={setOnModal} />
      )}

      {nowPageName !== 'deviceDetail' &&
        (clicked === '0' ? <EquipRepairLog setOnModal={setOnModal} /> : <EquipInstallLog />)} */}
      {clicked === '0' ? <EquipRepairLog setOnModal={setOnModal} /> : <EquipInstallLog />}
    </div>
  )
})

export default DetailList

const titleArr = ['Repair', 'Install', 'Replace'] // index 1,2번끼리 순서 바꿔야 함
