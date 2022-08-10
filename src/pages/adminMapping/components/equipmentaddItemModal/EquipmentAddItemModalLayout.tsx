import { ReactNode } from 'react'

import useStore from '../../../../useStore'

type Props = {
  children: ReactNode
}

const EquipmentAddItemModalLayout = ({ children }: Props) => {
  const { addItemToggle } = useStore()

  return (
    <div className="relative">
      <div
        onClick={() => addItemToggle.setIsEquipmentAddModal(false)}
        className="fixed right-0 top-0 left-0 h-screen w-screen bg-black opacity-60"
      />
      <div className="fixed left-1/2 top-1/2 flex h-[620px]  w-[30rem] -translate-x-1/2 -translate-y-1/2 flex-col overflow-x-hidden rounded bg-bgPaper">
        <div className="px-10 pt-10 pb-16">{children}</div>
      </div>
    </div>
  )
}

export default EquipmentAddItemModalLayout
