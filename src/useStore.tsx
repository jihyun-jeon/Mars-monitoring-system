import { addItemToggle } from './stores/addItemToggle'
import { deviceDetailData } from './stores/deviceDetailData'
import { equipDetailDatas } from './stores/equipDetailDatas'
import { listDatas } from './stores/listDatas'
import { enteredUserInfo } from './stores/login/enteredUserInfo'
import { pwVisibilityToggle } from './stores/login/pwVisibilityToggle'
import { validMessageToggle } from './stores/login/validMessageToggle'
import { mappingFilterOption } from './stores/mappingFilterOption'
import { pathNumbers } from './stores/pathNumbers'
import { isSideNavToggle } from './stores/sideNav/isSideNavToggle'
import { isTopNavIsToggle } from './stores/topNav/isTopNavIsToggle'
import { messageId } from './stores/topNav/messageId'
import { usersInfo } from './stores/usersInfo'

const useStore = () => {
  return {
    usersInfo,
    //Login - usersInfo, enteredUserInfo, validMessageToggle, pwVisibilityToggle
    enteredUserInfo,
    validMessageToggle,
    pwVisibilityToggle,
    // TopNav - isToggle, messageId, pathNumbers
    isTopNavIsToggle,
    messageId,
    pathNumbers,
    // SideNav - isSideNavToggle
    isSideNavToggle,
    listDatas,
    addItemToggle,
    mappingFilterOption,
    equipDetailDatas,
    deviceDetailData,
  }
}

export default useStore
