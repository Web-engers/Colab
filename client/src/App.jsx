import React from 'react'
import { useFirebase } from './context/Firebase'
import ResponsiveDrawer from './pages/Home'

const App = () => {

  const firebase = useFirebase()

  return (
    <div>
      <ResponsiveDrawer/>
    </div>
  )
}

export default App