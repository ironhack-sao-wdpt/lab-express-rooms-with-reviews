import { Navigate, useLocation } from "react-router-dom";
import { Component, useContext } from "react";

import { AuthContext } from "../context/authContext";
const ProtectedRoute = ({ component: Component }: any) => {
  const location = useLocation();
  const [loggedInUser, setLoggedInUser, loading] = useContext(AuthContext);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (loggedInUser.user._id) {
    return <Component />;
  } else {
    return <Navigate to="/login" state={{ from: location }} replace={true} />;
  }
};

export default ProtectedRoute;
