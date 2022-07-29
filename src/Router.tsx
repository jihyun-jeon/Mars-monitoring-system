import { BrowserRouter, Routes, Route } from 'react-router-dom'

import MainLayoutRoutes from './MainLayoutRoutes'
import Login from './pages/login/Login'

const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="*" element={<MainLayoutRoutes />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Routers
