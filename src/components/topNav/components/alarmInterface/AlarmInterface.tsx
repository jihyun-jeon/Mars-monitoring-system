import { observer } from 'mobx-react-lite'
import { BsFillBellFill } from 'react-icons/bs'
import { FaRegUserCircle } from 'react-icons/fa'
import { useNavigate } from 'react-router'

import { useToggle } from '../../../../hooks/useHandleToggle'
import useStore from '../../../../useStore'

interface Props {
  handleToggle: () => void
}

const AlarmInterface = observer(({ handleToggle }: Props) => {
  const navigate = useNavigate()

  const { usersInfo } = useStore()

  const [isCheckLogout, setIsCheckLogout] = useToggle(false)

  const token = usersInfo.userToken

  const logout = () => {
    usersInfo.removeUserToken()
    navigate('/')
  }

  return (
    <div className="relative left-4 flex items-center">
      <p className="text-lg font-semibold text-dot4"></p>
      <div className="relative">
        <BsFillBellFill onClick={handleToggle} className="ml-4 cursor-pointer text-2xl" />
        {/* boolean값 자리에 message 유무 변수 */}
        {false && (
          <button
            onClick={handleToggle}
            className="absolute -top-2 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-dot4 text-lg text-bgPaper"
          >
            1
          </button>
        )}
      </div>
      <FaRegUserCircle className="mx-4 text-3xl" />
      {token && (
        <button
          onClick={setIsCheckLogout}
          className="rounded-[0.5rem] bg-primary px-4 py-1 text-lg font-semibold text-[#fff]"
        >
          Logout
        </button>
      )}
      {isCheckLogout && (
        <div>
          <div
            onClick={setIsCheckLogout}
            className="fixed top-0 left-0 right-0 z-10 h-screen w-screen bg-[#000] opacity-60"
          />
          <div className="fixed left-1/2 top-1/2 z-20 h-80 w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white">
            <p className="relative h-1/5 w-full border-b-2 px-4 text-2xl font-bold leading-[4rem]">
              Logout
              <button
                type="button"
                className="absolute right-6 text-[#667085]"
                onClick={setIsCheckLogout}
              >
                x
              </button>
            </p>
            <div className="flexCenter h-3/5 text-2xl font-medium text-[#667085]">
              Are you sure you want to log out?
            </div>
            <div className="mb-6 flex w-full justify-center  px-1 align-middle">
              <button
                type="button"
                className="mr-3 h-10 w-[44%] rounded-xl  border   bg-[#000] text-[white] opacity-60"
                onClick={setIsCheckLogout}
              >
                Cancel
              </button>
              <button
                type="button"
                className="h-10 w-[44%] rounded-xl border   bg-primary text-[white]"
                onClick={logout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
})
export default AlarmInterface
