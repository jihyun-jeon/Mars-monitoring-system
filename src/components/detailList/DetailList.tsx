import { toJS } from 'mobx'
import { Observer } from 'mobx-react'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'

/*
import EquipInstallLog from '../../pages/equipmentDetail/components/EquipInstallLog'
import EquipLogAdd from '../../pages/equipmentDetail/components/EquipLogAdd'
import EquipRepairLog from '../../pages/equipmentDetail/components/EquipRepairLog'
import useStore from '../../useStore'

const DetailList = ({ setOnModal }) => {
  let [clicked, setClicked] = useState('0')
  const location = useLocation().pathname
  const nowPage = location.includes('equipment')

  const { usersInfo } = useStore()
  */
/*
import DeviceRepairAdd from '../../pages/deviceDetail/components/DeviceRepairAdd'
import DeviceReplaceAdd from '../../pages/deviceDetail/components/DeviceReplaceAdd'
import DeleteCheck from '../modal/components/DeleteCheck'

const DetailList = ({ usersInfo, setOnModal, fatherComp }) => {
  const [tapBtnName, setTapBtnName] = useState('repair')
  const [pageClick, setPageClick] = useState('1')

  const EachTapAddModal = () => {
    if (tapBtnName === 'install') {
      return
    }

    setOnModal(
      tapBtnName === 'repair'
        ? {
            clicked: true,
            childrun: <DeviceRepairAdd setOnModal={setOnModal} />,
          }
        : {
            clicked: true,
            childrun: <DeviceReplaceAdd setOnModal={setOnModal} />,
          },
    )
  }
  */

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
                onClick={() => {
                  // ??
                  EachTapAddModal()
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
          <div className="flexCenter relative w-full flex-row py-5 pb-20">
            {/* page select */}
            <div className="">
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
              <button
                type="button"
                className="px-2 text-[#242E40] hover:bg-gray-100 hover:text-[gray] "
              >
                &lt; &lt;
              </button>

              <button
                type="button"
                className="px-2 text-[#242E40]  hover:bg-gray-100 hover:text-[gray] "
              >
                &lt;
              </button>
              <div className="mx-3 flex">
                <button
                  type="button"
                  onClick={() => setPageClick('1')}
                  className={`flexCenter h-8 w-8 ${
                    pageClick === '1' && 'flexCenter rounded-[50%] bg-primary text-white'
                  } `}
                >
                  1
                </button>
                <button
                  type="button"
                  onClick={() => setPageClick('2')}
                  className={`flexCenter h-8 w-8 ${
                    pageClick === '2' && 'flexCenter rounded-[50%] bg-primary text-white'
                  } `}
                >
                  2
                </button>

                <button
                  type="button"
                  onClick={() => setPageClick('3')}
                  className={`flexCenter h-8 w-8 ${
                    pageClick === '3' && 'flexCenter rounded-[50%] bg-primary text-white'
                  } `}
                >
                  3
                </button>

                <button
                  type="button"
                  onClick={() => setPageClick('4')}
                  className={`flexCenter h-8 w-8 ${
                    pageClick === '4' && 'flexCenter rounded-[50%] bg-primary text-white'
                  } `}
                >
                  4
                </button>

                <button
                  type="button"
                  onClick={() => setPageClick('5')}
                  className={`flexCenter h-8 w-8 ${
                    pageClick === '5' && 'flexCenter rounded-[50%] bg-primary text-white'
                  } `}
                >
                  5
                </button>
              </div>
              <button
                type="button"
                className="px-2 text-[#242E40]  hover:bg-gray-100 hover:text-[gray] "
              >
                &gt;
              </button>
              <button
                type="button"
                className="px-2 text-[#242E40]  hover:bg-gray-100 hover:text-[gray] "
              >
                &gt; &gt;
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
