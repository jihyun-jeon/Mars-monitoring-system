import { listDatas } from './stores/listDatas'
import { usersInfo } from './stores/usersInfo'

const useStore = () => {
  return { usersInfo, listDatas }
}

export default useStore
