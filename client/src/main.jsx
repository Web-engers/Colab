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
      <LiveblocksProvider publicApiKey={"pk_prod_xNyCO3bsxHoYbgRzPwMOyjipxNRV-O6kv1PNRKg6DibNw_kDceSuKERIGDowP63V"}>
        <RoomProvider id="my-room">
            <App />
        </RoomProvider>
      </LiveblocksProvider>
    </FirebaseProvider>
  </StrictMode>
);
