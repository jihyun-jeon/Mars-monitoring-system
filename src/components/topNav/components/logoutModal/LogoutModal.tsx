import { useNavigate } from 'react-router'

import useStore from '../../../../useStore'

type LogoutModalProps = {
  checkLogoutOnModal: () => void
}

const LogoutModal = ({ checkLogoutOnModal }: LogoutModalProps) => {
  const { usersInfo, isTopNavIsToggle } = useStore()

  const navigate = useNavigate()

  const logout = () => {
    usersInfo.removeUserToken()
    isTopNavIsToggle.setIsCheckLogout(false)
    navigate('/')
  }

  return (
    <div>
      <div
        onClick={checkLogoutOnModal}
        className="fixed top-0 left-0 right-0 z-10 h-screen w-screen bg-[#000] opacity-60"
      />
      <div className="fixed left-1/2 top-1/2 z-20 h-80 w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white">
        <p className="relative h-1/5 w-full border-b-2 px-4 text-2xl font-bold leading-[4rem]">
          Logout
          <button
            type="button"
            className="absolute right-6 text-[#667085]"
            onClick={checkLogoutOnModal}
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
            onClick={checkLogoutOnModal}
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
  )
}

export default LogoutModal
