import { observer } from 'mobx-react'
<<<<<<< HEAD
import { useState, useEffect } from 'react'
=======
import { useState } from 'react'
>>>>>>> 456bf61 (FIX: 경로에 따라 리스트가 보이도록)
import { useLocation } from 'react-router'

import ListBoard from './components/listBoard/ListBoard'
import NestingFilter from './components/nestingFilter/NestingFilter'

import './List.css'

const List = observer(() => {
  const location = useLocation()
  const pathName = location.pathname.slice(1)

  const [isLoading, setIsLoading] = useState(true)

  //

  return (
    <div className="listWrapper h-screen overflow-y-scroll bg-bgDefault">
      <NestingFilter pathName={pathName} setIsLoading={setIsLoading} />
      <ListBoard pathName={pathName} isLoading={isLoading} />
    </div>
  )
})

export default List
