import { BrowserRouter, Routes, Route } from 'react-router-dom'

import MainLayoutRoutes from './MainLayoutRoutes'
import LoginLayout from './pages/login/components/loginLayout/LoginLayout'
import LoginForm from './pages/login/LoginForm'
// import PrivateRouter from './PrivateRouter'

const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginLayout />}>
          <Route path="/" element={<LoginForm />} />
        </Route>
        <Route path="*" element={<MainLayoutRoutes />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Routers
