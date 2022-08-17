import { addItemToggle } from './stores/addItemToggle'
import { deviceDetailData } from './stores/deviceDetailData'
import { equipDetailDatas } from './stores/equipDetailDatas'
import { listDatas } from './stores/listDatas'
import { enteredUserInfo } from './stores/login/enteredUserInfo'
import { pwVisibilityToggle } from './stores/login/pwVisibilityToggle'
import { validMessageToggle } from './stores/login/validMessageToggle'
import { mappingFilterOption } from './stores/mappingFilterOption'
import { pathNumbers } from './stores/pathNumbers'
import { usersInfo } from './stores/usersInfo'

const useStore = () => {
  return {
    usersInfo,
    //Login - usersInfo, enteredUserInfo, validMessageToggle, pwVisibilityToggle
    enteredUserInfo,
    validMessageToggle,
    pwVisibilityToggle,
    listDatas,
    pathNumbers,
    addItemToggle,
    mappingFilterOption,
    equipDetailDatas,
    deviceDetailData,
  }
}

export default useStore
