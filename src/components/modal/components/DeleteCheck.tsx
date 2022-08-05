import { useState } from 'react'

interface deleteCheckType {
  setOnModal: any
  deleteApi: () => void
}

const DeleteCheck = ({ setOnModal, deleteApi }: deleteCheckType) => {
  return (
    <div className="h-80 w-[500px] rounded-lg bg-white ">
      <p className="relative h-1/5 w-full border-b-2 px-4 text-2xl font-bold leading-[4rem]">
        Delete
        <button
          type="button"
          className="absolute right-6 text-[#667085]"
          onClick={() => {
            setOnModal(false)
          }}
        >
          x
        </button>
      </p>
      <div className="flexCenter h-3/5 font-medium text-[#667085]">정말 삭제하시겠습니까?</div>
      <div className="mb-6 flex w-full justify-center  px-1 align-middle">
        <button
          type="button"
          className="mr-3 h-10 w-[44%] rounded-xl  border   bg-[lightgray]"
          onClick={() => {
            setOnModal(false)
          }}
        >
          취소
        </button>
        <button
          type="button"
          className="h-10 w-[44%] rounded-xl border   bg-primary text-[white]"
          onClick={() => {
            setOnModal(false)
            deleteApi()
          }}
        >
          삭제
        </button>
      </div>
    </div>
  )
}

export default DeleteCheck
