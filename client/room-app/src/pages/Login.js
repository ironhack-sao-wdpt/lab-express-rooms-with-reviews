import { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import FormControl from "../components/FormControl";
import FormButton from "../components/FormButton";

import { AuthContext } from "../contexts/authContext";

import api from "../apis/api";

function Login() {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const [loggedInUser, setLoggedInUser] = useContext(AuthContext);

  function handleChange({ target }) {
    const { name, value } = target;
    setState({ ...state, [name]: value });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await api.post("/login", state);
      console.log(response.data);

      setLoggedInUser({ ...response.data });

      window.localStorage.setItem(
        "loggedInUser",
        JSON.stringify(response.data)
      );

      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <h1>Entrar</h1>

      <form onSubmit={handleSubmit}>
        <FormControl
          label="Email"
          id="loginFormEmail"
          name="email"
          type="email"
          value={state.email}
          onChange={handleChange}
        />
        <FormControl
          label="Senha"
          id="loginFormPassword"
          name="password"
          type="password"
          value={state.password}
          onChange={handleChange}
        />
        <FormButton>Entrar</FormButton>
      </form>
    </div>
  );
}

export default Login;
