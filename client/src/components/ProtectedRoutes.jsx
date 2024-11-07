import React, { useContext } from 'react'
import { useFirebase } from '../context/Firebase'
import SignInPage from '../pages/Signin'


const ProtectedRoutes = ({children}) => {
    const firebase = useFirebase()
  return (
    firebase.user != null ? {children} : <SignInPage/>
  )
}

export default ProtectedRoutes