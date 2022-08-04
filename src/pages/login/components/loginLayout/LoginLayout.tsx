import { Outlet } from 'react-router'

import './LoginLayout.css'

const LoginLayout = () => {
  return (
    <div className="backgroundView relative h-screen w-screen">
      <div className="absolute top-2/4 left-2/4 flex  -translate-y-1/2 -translate-x-2/4 shadow-2xl">
        <div className="h-[34rem] w-[35rem] bg-bgPaper p-[6rem]">
          <p className="absolute top-4 left-4 text-xl font-semibold">Mars</p>
          <Outlet />
        </div>
        <div className="welcomeView bg-top-left w-[30rem] bg-no-repeat" />
        <p className="absolute bottom-4 right-4 text-bgPaper">http://Mars.ai</p>
      </div>
    </div>
  )
}

export default LoginLayout
