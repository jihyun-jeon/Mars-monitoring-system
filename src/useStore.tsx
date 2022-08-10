import { detailDatas } from './stores/detailDatas'
import { listDatas } from './stores/listDatas'
import { pathNumbers } from './stores/pathNumbers'
import { usersInfo } from './stores/usersInfo'

const useStore = () => {
  return { usersInfo, listDatas, pathNumbers, detailDatas }
}

export default useStore
