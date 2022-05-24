import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import RoomCreate from "./pages/RoomCreate";
import RoomUpdate from "./pages/RoomUpdate";
import ProtectedRoute from "./pages/ProtectedRoute";
import RoomDelete from "./pages/RoomDelete";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import RoomDetail from "./pages/RoomDetail";

import { AuthContextComponent } from "./contexts/authContext";

function App() {
  return (
    <div>
      <AuthContextComponent>
        <Navbar />
        <div className="container mt-5">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/room-create"
              element={<ProtectedRoute component={RoomCreate} />}
            />
            <Route
              path="/room-update/:id"
              element={<ProtectedRoute component={RoomUpdate} />}
            />
            <Route
              path="/room-delete/:id"
              element={<ProtectedRoute component={RoomDelete} />}
            />
            <Route
              path="/rooms/:id"
              element={<ProtectedRoute component={RoomDetail} />}
            />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </AuthContextComponent>
    </div>
  );
}

export default App;
