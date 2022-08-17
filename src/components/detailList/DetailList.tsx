import { observer } from 'mobx-react'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'

import DeviceInstallLog from '../../pages/deviceDetail/components/DeviceInstallLog'
import DeviceRepairAdd from '../../pages/deviceDetail/components/DeviceRepairAdd'
import DeviceRepairLog from '../../pages/deviceDetail/components/DeviceRepairLog'
import DeviceReplaceAdd from '../../pages/deviceDetail/components/DeviceReplaceAdd'
import DeviceReplaceLog from '../../pages/deviceDetail/components/DeviceReplaceLog'
import EquipInstallLog from '../../pages/equipmentDetail/components/EquipInstallLog'
import EquipLogAdd from '../../pages/equipmentDetail/components/EquipRepairAdd'
import EquipRepairLog from '../../pages/equipmentDetail/components/EquipRepairLog'
import useStore from '../../useStore'

const DetailList = observer(({ setOnModal }) => {
  const [clickedTap, setClickedTap] = useState('0')
  const location = useLocation().pathname
  const nowPageName = location.split('/')[1]

  const { usersInfo } = useStore()

  const AddBtnPopup = () => {
    if (clickedTap === '0') {
      nowPageName === 'equipmentDetail'
        ? setOnModal({ clicked: true, childrun: <EquipLogAdd setOnModal={setOnModal} /> })
        : setOnModal({
            clicked: true,
            childrun: <DeviceRepairAdd setOnModal={setOnModal} />,
          })
    }

    if (clickedTap === '1') {
      setOnModal({
        clicked: true,
        childrun: <DeviceReplaceAdd setOnModal={setOnModal} />,
      })
    }
  }

  return (
    <div className="px-10">
      <div className="flex justify-between">
        <div className="flex">
          {titleArr.map((el, idx) => {
            if (nowPageName === 'equipmentDetail' && idx === 1) {
              return
            }
            return (
              <button
                key={idx}
                value={idx}
                onClick={(e) => {
                  setClickedTap(`${(e.target as HTMLButtonElement).value}`)
                }}
                className={`${
                  `${idx}` === clickedTap ? 'bg-[#EFF2F5]' : ''
                } border-gray my-auto mx-0 rounded-t-lg border-[1px] px-8 py-4 text-lg`}
              >
                {el}
              </button>
            )
          })}
        </div>
        {usersInfo._isEquipmentControl && (
          <button
            type="button"
            name="add"
            disabled={clickedTap === '2'}
            className={`mb-5 mr-2 h-10 w-32 rounded-lg ${
              clickedTap === '2' ? 'cursor-not-allowed bg-blue-200' : 'bg-primary'
            } text-xl text-white`}
            onClick={AddBtnPopup}
          >
            Add
          </button>
        )}
      </div>

      {clickedTap === '0' &&
        (nowPageName === 'equipmentDetail' ? (
          <EquipRepairLog setOnModal={setOnModal} />
        ) : (
          <DeviceRepairLog setOnModal={setOnModal} />
        ))}

      {clickedTap === '1' && <DeviceReplaceLog setOnModal={setOnModal} />}

      {clickedTap === '2' &&
        (nowPageName === 'equipmentDetail' ? <EquipInstallLog /> : <DeviceInstallLog />)}
    </div>
  )
})

export default DetailList

const titleArr = ['Repair', 'Replace', 'Install']
