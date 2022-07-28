import React, { ReactElement } from 'react'
import { Navigate, Outlet } from 'react-router'

interface PrivateRouteProps {
  children?: ReactElement
  authentication: boolean
}

function PrivateRouter({ authentication }: PrivateRouteProps): React.ReactElement | null {
  const isAuthenticated = localStorage.getItem('isAuthenticated')

  if (authentication) {
    return isAuthenticated === null || isAuthenticated === 'false' ? (
      <Navigate to="/home" />
    ) : (
      <Outlet />
    )
  } else {
    return isAuthenticated === null || isAuthenticated === 'false' ? (
      <Outlet />
    ) : (
      <Navigate to="/" />
    )
  }
}

export default PrivateRouter
