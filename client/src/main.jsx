import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { FirebaseProvider } from './context/Firebase.jsx'
import {
  LiveblocksProvider,
  RoomProvider,
} from "@liveblocks/react/suspense";
createRoot(document.getElementById('root')).render(
  <StrictMode>
      <FirebaseProvider>
    <LiveblocksProvider publicApiKey={"pk_dev_qYhZM1h5dv4UncKhgR0rH_wWRLdMFTMOx1LCwymNv8vmlRg3tMFX63Uej2DwhAM_"}>
      <RoomProvider id="my-room">
        <App/>
      </RoomProvider>
    </LiveblocksProvider>
      </FirebaseProvider>
    </StrictMode>,
)
