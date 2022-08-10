import React from 'react'

interface messageType {
  toastMessage: (string | undefined)[]
  setToastMessage: any
  toastIcon: (string | undefined)[]
  setToastIcon: any
}

const AppContext = React.createContext<messageType>({
  toastMessage: [],
  setToastMessage: () => {},
  toastIcon: [],
  setToastIcon: () => {},
})

export default AppContext
