import { addItemToggle } from './stores/addItemToggle'
import { detailDatas } from './stores/detailDatas'
import { listDatas } from './stores/listDatas'
import { mappingFilterOption } from './stores/mappingFilterOption'
import { pathNumbers } from './stores/pathNumbers'
import { usersInfo } from './stores/usersInfo'

const useStore = () => {
  return { usersInfo, listDatas, pathNumbers, addItemToggle, mappingFilterOption, detailDatas }
}

export default useStore
