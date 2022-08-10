import { ReactNode } from 'react'

import useStore from '../../../../useStore'

type Props = {
  children: ReactNode
}

const DeviceAddItemModalLayout = ({ children }: Props) => {
  const { addItemToggle } = useStore()

  return (
    <div className="relative">
      <div
        onClick={() => addItemToggle.setIsDeviceAddModal(false)}
        className="fixed right-0 top-0 left-0 h-screen w-screen bg-black opacity-60"
      />
      <div className="fixed left-1/2 top-1/2 flex h-[450px]  w-[30rem] -translate-x-1/2 -translate-y-1/2 flex-col  rounded bg-bgPaper">
        <div className="p-10">{children}</div>
      </div>
    </div>
  )
}

export default DeviceAddItemModalLayout
