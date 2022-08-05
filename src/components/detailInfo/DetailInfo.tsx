import { toJS } from 'mobx'
import { Observer } from 'mobx-react'

const DetailInfo = ({ usersInfo, setOnModal, EditComp }) => {
  return (
    <Observer>
      {() => (
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
                  setOnModal({ clicked: true, childrun: <EditComp setOnModal={setOnModal} /> })
                }}
              >
                Edit
              </button>
            </p>
          )}
          <div className="p-14 pt-28">
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
      )}
    </Observer>
  )
}

export default DetailInfo
