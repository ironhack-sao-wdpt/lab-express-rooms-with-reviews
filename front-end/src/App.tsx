import "./App.css";
import Login from "./pages/Login";
import Singup from "./pages/Singup";
import { AuthContextComponent } from "../src/context/authContext";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <AuthContextComponent>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Singup />} />
        </Routes>
      </AuthContextComponent>
    </div>
  );
}

export default App;
