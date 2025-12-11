import EnterNamePage from "./pages/EnterNamePage.tsx";
import HomePage from "./pages/HomePage.tsx";
import {Routes, Route} from "react-router-dom";
import LobbyPage from "./pages/LobbyPage.tsx";
import { useLocation } from "react-router-dom";
import { useAtom } from "jotai";
import { playerInfoAtom } from "./atoms/playerInfoAtom.ts";
function App() {
  const [user] = useAtom(playerInfoAtom);

  return (
    <>
        <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/enter-name" element={<EnterNamePage/>} />
            <Route 
              path="/lobby" 
              element={<LobbyPage key={user?.roomCode || 'default'} />} 
            />
        </Routes>
    </>
  )
}

export default App
