import "./App.css";
import Login from "./pages/Login";
import Singup from "./pages/Singup";
import { AuthContextComponent } from "../src/context/authContext";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./pages/ProtectedRoute";
import Home from "./pages/Home";
import CreateRoom from "./pages/CreateRoom";
import MyRooms from "./pages/MyRooms";
import RoomDetails from "./pages/RoomDetails";
import EditRoom from "./pages/EditRoom";

function App() {
  return (
    <div className="App">
      <AuthContextComponent>
        <Navbar />
        <Routes>
          <Route path="/" element={<ProtectedRoute component={Home} />} />
          <Route
            path="/myrooms"
            element={<ProtectedRoute component={MyRooms} />}
          />
          <Route
            path="/create"
            element={<ProtectedRoute component={CreateRoom} />}
          />
          <Route
            path="/roomdetails/:roomId"
            element={<ProtectedRoute component={RoomDetails} />}
          />
          <Route
            path="/editroom/:roomId"
            element={<ProtectedRoute component={EditRoom} />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Singup />} />
        </Routes>
      </AuthContextComponent>
    </div>
  );
}

export default App;
