import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import AppContext from './AppContext'
import Toast from './components/toast/Toast'
import MainLayoutRoutes from './MainLayoutRoutes'
import LoginLayout from './pages/login/components/loginLayout/LoginLayout'
import LoginForm from './pages/login/LoginForm'

const Routers = () => {
  const [toastMessage, setToastMessage] = useState([])
  const [toastIcon, setToastIcon] = useState([])

  return (
    <BrowserRouter>
      <AppContext.Provider value={{ toastMessage, setToastMessage, toastIcon, setToastIcon }}>
        <Routes>
          <Route path="/" element={<LoginLayout />}>
            <Route path="/" element={<LoginForm />} />
          </Route>
          <Route path="*" element={<MainLayoutRoutes />} />
        </Routes>
        <Toast
          toastMessage={toastMessage}
          setToastMessage={setToastMessage}
          toastIcon={toastIcon}
          setToastIcon={setToastIcon}
        />
      </AppContext.Provider>
    </BrowserRouter>
  )
}

export default Routers
