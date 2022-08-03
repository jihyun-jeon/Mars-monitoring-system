import { toJS } from 'mobx'
import { observer } from 'mobx-react'
import { useEffect } from 'react'
import { useLocation } from 'react-router'

import useStore from '../../useStore'
import ListBoard from './components/listBoard/ListBoard'
import NestingFilter from './components/nestingFilter/NestingFilter'

import './List.css'

const List = observer(() => {
  const location = useLocation()
  const pathName = location.pathname.slice(1)

  const { listDatas } = useStore()
  const { isLoading } = listDatas

  useEffect(() => {
    console.log(toJS(listDatas.equipmentListData))
  }, [])

  if (isLoading) return <div>Loading...</div>

  return (
    <div className="listWrapper h-screen overflow-y-scroll bg-bgDefault">
      <NestingFilter pathName={pathName} />
      <ListBoard pathName={pathName} />
    </div>
  )
})

export default List
