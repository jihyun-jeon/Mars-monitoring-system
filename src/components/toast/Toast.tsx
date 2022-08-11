import React, { useEffect, useRef } from 'react'
import { FcOk, FcHighPriority } from 'react-icons/fc'

interface messageType {
  toastMessage: (string | undefined)[]
  setToastMessage: any
  toastIcon: (string | undefined)[]
  setToastIcon: any
}

const Toast = ({ toastMessage, setToastMessage, toastIcon, setToastIcon }: messageType) => {
  const divEl = React.useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (toastMessage.length > 0) {
      setTimeout(() => {
        if (divEl.current) {
          divEl.current.classList.add('opacity-25')
        }
      }, 3500)
      setTimeout(() => {
        setToastMessage([])
        setToastIcon([])
      }, 3600)
    }
  }, [toastMessage, toastIcon])

  if (toastMessage.length < 1) {
    return null
  }

  return (
    <div
      ref={divEl}
      className="zIndex-1 transition-duration: 2000ms linear fixed top-[100px] right-10 z-50 flex w-[23rem] flex-row rounded-md bg-[#EEEEEE] py-4 px-4 align-middle text-base shadow-[1px_1px_10px_1px_rgba(0,0,0,0.34)] transition-all"
    >
      {toastIcon[0]}
      <span className="pl-4">{toastMessage[0]}</span>
    </div>
  )
}

export default Toast
