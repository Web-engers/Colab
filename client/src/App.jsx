import React from 'react';
import { useFirebase } from './context/Firebase';
// import FourOFour from './pages/FourOFour';
import ResponsiveDrawer from './pages/Home'; 
import { RoomProvider } from "@liveblocks/react";
import WhiteBoard from './components/WhiteBoard';
const App = () => {
  const firebase = useFirebase(); 
  return (
    <RoomProvider id={"Room-1"}>
      <WhiteBoard name = "priyam"/>
      {/* <ResponsiveDrawer/> */}
    </RoomProvider>
  );
};

export default App;
