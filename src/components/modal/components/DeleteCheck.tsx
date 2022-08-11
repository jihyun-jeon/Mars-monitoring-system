import { useContext } from 'react'
import { FcOk, FcHighPriority } from 'react-icons/fc'

import AppContext from '../../../AppContext'
interface deleteCheckType {
  setOnModal: any
  deleteApi: () => void
}

const DeleteCheck = ({ setOnModal, deleteApi }: deleteCheckType) => {
  const appContext = useContext(AppContext)
  return (
    <div className="h-80 w-[500px] rounded-lg bg-white ">
      <p className="relative h-1/5 w-full border-b-2 px-4 text-2xl font-bold leading-[4rem]">
        Delete
        <button
          type="button"
          className="absolute right-6 text-[#667085]"
          onClick={() => {
            setOnModal({ click: false, childrun: '' })
          }}
        >
          x
        </button>
      </p>
      <div className="flexCenter h-3/5 text-2xl font-medium text-[#667085]">
        Are you sure you want to delete it?
      </div>
      <div className="mb-6 flex w-full justify-center  px-1 align-middle">
        <button
          type="button"
          className="mr-3 h-10 w-[44%] rounded-xl  border   bg-[#000] text-[white] opacity-60"
          onClick={() => {
            setOnModal(false)
          }}
        >
          Cancel
        </button>
        <button
          type="button"
          className="h-10 w-[44%] rounded-xl border   bg-primary text-[white]"
          onClick={() => {
            appContext.setToastIcon([<FcOk key="1" className="text-2xl" />])
            appContext.setToastMessage(['Complete Deleted'])
            setOnModal({ clicked: false, content: '' })
            deleteApi()
          }}
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default DeleteCheck
