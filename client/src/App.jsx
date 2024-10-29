import React from 'react'
import { useFirebase } from './context/Firebase'

const App = () => {

  const firebase = useFirebase()

  return (
    <div>
      <button onClick={firebase.signinWithGoogle}>Sign in with google</button>
    </div>
  )
}

export default App