import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ChatUI from "./components/ChatUI";  
import ChatLayout from "./components/ChatLayout";
function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="/chat" element={<ChatLayout />} />
      </Routes>

    </BrowserRouter>

  );

}

export default App;