import React from 'react'
import { useFirebase } from '../context/Firebase'


const Home = () => {
    const {signOut} = useFirebase()
  return (
    <div>
        Home
        <button onClick={()=>signOut()}>Signout</button>
    </div>

  )
}

export default Home