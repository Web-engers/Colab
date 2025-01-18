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
      <LiveblocksProvider publicApiKey={"pk_dev_aFsFOY4zPsxcpBto34hgzl_TsWybXo_aKyLU1Czx0awtYIGwuE2fWoBZySXYe-Wx"}>
        <RoomProvider id="my-room">
            <App />
        </RoomProvider>
      </LiveblocksProvider>
    </FirebaseProvider>
  </StrictMode>
);
