import { BrowserRouter, Routes, Route } from 'react-router-dom'

import MainLayoutRoutes from './MainLayoutRoutes'
import Login from './pages/login/Login'
import PrivateRouter from './PrivateRouter'

const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRouter authentication={false} />}>
          <Route path="/" element={<Login />} />
        </Route>

        <Route element={<PrivateRouter authentication={true} />}>
          <Route path="*" element={<MainLayoutRoutes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Routers
