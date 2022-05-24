import { useState } from "react";
import { useNavigate } from "react-router-dom";

import FormControl from "../components/FormControl";
import FormButton from "../components/FormButton";

import api from "../apis/api";

function Signup() {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  function handleChange(event) {
    setState({ ...state, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      if (state.password !== state.confirmPassword) {
        throw new Error("Passwords do not match");
      }

      const response = await api.post("/signup", state);

      console.log(response.data);

      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <h1>New user</h1>
      <form onSubmit={handleSubmit}>
        <FormControl
          label="Nome"
          name="name"
          id="signupFormName"
          value={state.name}
          onChange={handleChange}
        />
        <FormControl
          label="E-mail"
          type="email"
          name="email"
          id="signupFormEmail"
          value={state.email}
          onChange={handleChange}
        />
        <FormControl
          label="Senha"
          type="password"
          name="password"
          id="signupFormPassword"
          value={state.password}
          onChange={handleChange}
        />
        <FormControl
          label="Confirme a senha"
          type="password"
          name="confirmPassword"
          id="signupFormConfirmPassword"
          value={state.confirmPassword}
          onChange={handleChange}
        />

        <FormButton>Singup</FormButton>
      </form>
    </div>
  );
}

export default Signup;
