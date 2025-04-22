import "./App.css";

import Chat from "./pages/Chat";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <div className="h-[100vh]">
        <Routes>
          <Route path="/" element={<Chat />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
