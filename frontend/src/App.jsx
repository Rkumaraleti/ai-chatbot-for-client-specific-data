import "./App.css";

import Chat from "./pages/Chat";
import Admin from "./pages/Admin";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <div className="h-[100vh]">
        <Routes>
          <Route path="/" element={<Chat />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
