import React from 'react'
import { useFirebase } from '../context/Firebase'


const Home = () => {
    const {signOut} = useFirebase()
  return (
    <div>
        Home
        <button onClick={()=>signOut()}>Signout</button>
        <button onClick={()=>addNewBoard()}>CreateNew</button>
    </div>

  )
}

export default Home