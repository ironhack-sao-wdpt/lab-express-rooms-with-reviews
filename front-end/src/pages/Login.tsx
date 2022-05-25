import { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import axiosApi from "../apis/axiosApi";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Login = () => {
  type loginInterface = {
    email: string;
    password: string;
  };

  const [state, setState] = useState<loginInterface>({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const location: any = useLocation();

  const from = location.state?.from?.pathname || "/";

  const [loggedInUser, setLoggedInUser] = useContext(AuthContext);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setState({ ...state, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const response = await axiosApi.post("/login", state);

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
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 2, width: "50vw" },
        ".MuiButton-root": { m: 2, width: "50vw" },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      noValidate
      onSubmit={handleSubmit}
      autoComplete="off"
    >
      <TextField
        required
        name="email"
        label="Email"
        type="email"
        onChange={handleChange}
        value={state.email}
      />
      <TextField
        required
        name="password"
        type="password"
        label="Senha"
        value={state.password}
        onChange={handleChange}
      />
      <Button variant="contained" type="submit">
        Login
      </Button>
    </Box>
  );
};

export default Login;
