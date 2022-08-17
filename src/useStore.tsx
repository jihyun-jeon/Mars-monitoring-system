import { addItemToggle } from './stores/addItemToggle'
import { deviceDetailData } from './stores/deviceDetailData'
import { equipDetailDatas } from './stores/equipDetailDatas'
import { listDatas } from './stores/listDatas'
import { mappingFilterOption } from './stores/mappingFilterOption'
import { pathNumbers } from './stores/pathNumbers'
import { usersInfo } from './stores/usersInfo'

const useStore = () => {
  return {
    usersInfo,
    listDatas,
    pathNumbers,
    addItemToggle,
    mappingFilterOption,
    equipDetailDatas,
    deviceDetailData,
  }
}

export default useStore
