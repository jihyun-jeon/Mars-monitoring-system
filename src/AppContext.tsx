import React from 'react'

interface messageType {
  toastMessage: (string | undefined)[]
  setToastMessage: any
}

const AppContext = React.createContext<messageType>({
  toastMessage: [],
  setToastMessage: () => {},
})

export default AppContext
