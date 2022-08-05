import { useContext } from 'react'

import AppContext from '../../../AppContext'

const EquipEdit = ({ setOnModal }) => {
  const appContext = useContext(AppContext)

  return (
    <div className="relative h-[34rem] w-[60rem] rounded-lg  bg-white px-16 pt-5">
      <h1 className="flexCenter pb-8 text-2xl">Equipment Edit</h1>
      <h3 className="pb-8 text-2xl">eq-78900</h3>

      <div className=" flex flex-col">
        <div className="mb-10 flex justify-between">
          <label className="mb-2 flex w-44 flex-col">
            <span className=" ">Plate Number</span>
            <select className="rounded-md border-2">
              <option>DUMMY64</option>
              <option>DUMMY64</option>
            </select>
          </label>

          <label className="mb-2 flex  w-44 flex-col ">
            Manufacture Date
            <input type="text" className="rounded-md border-2 pl-2 " value="2022-04-26" />
          </label>

          <label className="mb-2 flex  w-44 flex-col">
            Capacity
            <div>
              <select className="w-1/2 rounded-md border-2">
                <option>100</option>
                <option>100</option>
              </select>
              <select className="w-1/2 rounded-md border-2">
                <option>M3</option>
                <option>M3</option>
              </select>
            </div>
          </label>

          <label className="mb-2 flex  w-44 flex-col">
            Equipment
            <select className="rounded-md border-2">
              <option>Drill machine</option>
              <option>Drill machine</option>
            </select>
          </label>
        </div>

        <div className="mb-10 flex justify-between">
          <label className="mb-2 flex  w-44 flex-col">
            Type
            <select className="rounded-md border-2">
              <option>Crawler drill machine</option>
              <option>Crawler drill machine</option>
            </select>
          </label>

          <label className="mb-2 flex  w-44 flex-col">
            QR Code
            <select className="rounded-md border-2">
              <option>a</option>
              <option>aa</option>
            </select>
          </label>

          <label className="mb-2 flex  w-44 flex-col">
            Company
            <select className="rounded-md border-2">
              <option>Sed</option>
              <option>Sed</option>
            </select>
          </label>

          <label className="mb-2 flex  w-44 flex-col">
            Maintenance_id?
            <select className="rounded-md border-2">
              <option>1</option>
              <option>1</option>
            </select>
          </label>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full">
        <button
          type="button"
          className="h-10 w-1/2 bg-slate-400"
          onClick={() => setOnModal({ clicked: false, content: '' })}
        >
          Cancel
        </button>
        <button
          type="button"
          className="h-10 w-1/2  bg-primary"
          onClick={() => {
            appContext.setToastMessage(['수정이 완료되었습니다.'])
            setOnModal({ clicked: false, content: '' })
          }}
        >
          Edit
        </button>
      </div>
    </div>
  )
}

export default EquipEdit
