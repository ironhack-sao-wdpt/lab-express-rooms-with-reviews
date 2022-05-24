import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../contexts/authContext";

function ProtectedRoute({ component: Component }) {
  const location = useLocation();
  const [loggedInUser, loading] = useContext(AuthContext);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (loggedInUser.user._id) {
    return <Component />;
  } else {
    return <Navigate to="/login" state={{ from: location }} replace={true} />;
  }
}

export default ProtectedRoute;
