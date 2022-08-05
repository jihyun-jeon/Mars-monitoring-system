import { observer } from 'mobx-react'
import { useState } from 'react'
import { useLocation } from 'react-router'

import ListBoard from './components/listBoard/ListBoard'
import NestingFilter from './components/nestingFilter/NestingFilter'

import './List.css'

const List = observer(() => {
  const location = useLocation()
  const pathName = location.pathname.slice(1)

  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className="listWrapper h-screen overflow-y-scroll bg-bgDefault">
      <NestingFilter pathName={pathName} setIsLoading={setIsLoading} />
      <ListBoard pathName={pathName} isLoading={isLoading} />
    </div>
  )
})

export default List
