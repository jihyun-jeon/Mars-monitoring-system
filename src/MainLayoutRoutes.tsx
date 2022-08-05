import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import AppContext from './AppContext'
import SideNav from './components/sideNav/SideNav'
import Toast from './components/toast/Toast'
import TopNav from './components/topNav/TopNav'
import AdminHistory from './pages/adminHistory/adminHistory'
import AdminMapping from './pages/adminMapping/AdminMapping'
import DeviceDetail from './pages/deviceDetail/DeviceDetail'
import DeviceList from './pages/deviceList/DeviceList'
import EquipmentDetail from './pages/equipmentDetail/EquipmentDetail'
import EquipmentList from './pages/equipmentList/EquipmentList'
import Home from './pages/home/Home'

const MainLayoutRoutes = () => {
  const [toastMessage, setToastMessage] = useState([])

  return (
    <>
      <div className="flex h-screen">
        <SideNav />
        <div className="flex w-full flex-col pr-4">
          <TopNav />
          <AppContext.Provider value={{ toastMessage, setToastMessage }}>
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/equipmentList" element={<EquipmentList />} />
              <Route path="/equipmentList/equipmentDetail" element={<EquipmentDetail />} />
              <Route path="/deviceList" element={<DeviceList />} />
              <Route path="/deviceDetail" element={<DeviceDetail />} />
              <Route path="/adminMapping" element={<AdminMapping />} />
              <Route path="/adminHistory" element={<AdminHistory />} />
            </Routes>
            <Toast toastMessage={toastMessage} setToastMessage={setToastMessage} />
          </AppContext.Provider>
        </div>
      </div>
    </>
  )
}

export default MainLayoutRoutes
