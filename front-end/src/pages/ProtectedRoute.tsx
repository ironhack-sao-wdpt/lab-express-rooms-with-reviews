import { Navigate, useLocation } from "react-router-dom";
import { Component, useContext } from "react";

import { AuthContext } from "../context/authContext";
const ProtectedRoute = ({ component: Component }: any) => {
  // o useLocation retorna um objeto com dados da rota atual do navegador
  const location = useLocation();
  const [loggedInUser, setLoggedInUser, loading] = useContext(AuthContext);

  // Esperar o Context terminar de procurar no localStorage os dados do usuário logado antes de redirecionar
  if (loading) {
    return <div>Carregando...</div>;
  }

  // Verificar se o usuário está logado

  if (loggedInUser.user._id) {
    // Se estiver logado, retorna a página original
    return <Component />;
  } else {
    // Caso contrário, redireciona pro login
    // O Navigate aceita uma prop opcional state que nos permite gravar a rota atual antes do redirecionamento. Dessa forma, podemos "voltar" para a rota atual depois do processo de login ao invés de redirecionar o usuário para a Home toda vez
    return <Navigate to="/login" state={{ from: location }} replace={true} />;
  }
};

export default ProtectedRoute;
