import React, { useEffect, useRef } from 'react'
import { FcOk } from 'react-icons/fc'

interface messageType {
  toastMessage: (string | undefined)[]
  setToastMessage: any
}

const Toast = ({ toastMessage, setToastMessage }: messageType) => {
  const divEl = React.useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (toastMessage.length > 0) {
      setTimeout(() => {
        if (divEl.current) {
          divEl.current.classList.add('opacity-25')
        }
      }, 2000)
      setTimeout(() => {
        setToastMessage([])
      }, 2100)
    }
  }, [toastMessage])

  if (toastMessage.length < 1) {
    return null
  }

  return (
    <div
      ref={divEl}
      className="zIndex-1 transition-duration: 2000ms linear fixed top-[100px] right-10 flex w-[23rem] flex-row rounded-md bg-[#EEEEEE] py-4 px-4 align-middle text-base shadow-[1px_1px_10px_1px_rgba(0,0,0,0.34)] transition-all"
    >
      <FcOk className="text-2xl" /> <span className="pl-4">{toastMessage[0]}</span>
    </div>
  )
}

export default Toast
