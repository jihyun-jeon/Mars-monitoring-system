import { toJS } from 'mobx'
import { observer } from 'mobx-react'

const DetailInfo = observer(({ usersInfo, setOnModal, EditComp }) => {
  return (
    <div className="relative mt-5">
      {toJS(usersInfo)._isEquipmentControl && (
        <p className="absolute right-10 top-16">
          <button
            type="button"
            className="mt-4 mr-3 h-10 w-32 rounded-lg bg-primary text-xl text-white"
            // onClick={unMatchRequest}
          >
            Unmatched
          </button>
          <button
            type="button"
            name="edit"
            className="mb-5 h-10 w-32 rounded-lg  bg-primary text-xl text-white"
            onClick={(e) => {
              setOnModal({ clicked: true, childrun: <EditComp setOnModal={setOnModal} /> })
            }}
          >
            Edit
          </button>
        </p>
      )}
      <div className="p-14 pt-28">
        <h1 className="mb-10 mt-[-5px] text-2xl font-semibold text-gray-400">
          General Information
        </h1>
        <ul className="grid w-full grid-cols-4 pb-16">
          <li>
            <p className="font-extrabold">Serial Number</p>
            <p>dv-1028</p>
          </li>
          <li>
            <p className="font-extrabold">Qr code</p>
            <p>19044</p>
          </li>
          <li>
            <p className="font-extrabold">company</p>
            <p>AAE</p>
          </li>
          <li>
            <p className="font-extrabold">statellites Used</p>
            <p>2</p>
          </li>
        </ul>
        <ul className="grid w-full grid-cols-4 pb-10">
          <li>
            <p className="font-extrabold">Matched Equipment</p>
            <p>eq-2901</p>
          </li>
          <li>
            <p className="font-extrabold">Matched Equipment Category</p>
            <p>Aerial Equipment</p>
          </li>
          {/* <li>
            <p className="font-extrabold">Name</p>
            <p>Drill Machine</p>
          </li>
          <li>
            <p className="font-extrabold">Name</p>
            <p>Drill Machine</p>
          </li> */}
        </ul>
        <div className="mb-20 mt-10 border-t-2" />
        <h1 className="mb-10 mt-[-15px] text-2xl font-semibold text-gray-400">Status</h1>
        <ul className="grid w-full grid-cols-4 pb-10">
          <li>
            <p className="font-extrabold">Power</p>
            <p>Power On</p>
          </li>
          <li>
            <p className="font-extrabold">Last Log Time</p>
            <p>2022-08-04 T00:00:00</p>
          </li>
          <li>
            <p className="font-extrabold">Battery</p>
            <p>1500mAh</p>
          </li>
          <li>
            <p className="font-extrabold">Error</p>
            <p>Low Battery</p>
          </li>
        </ul>
      </div>
    </div>
  )
})

export default DetailInfo
