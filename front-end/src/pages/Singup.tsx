import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axiosApi from "../apis/axiosApi";
import { Navigate, useNavigate } from "react-router-dom";

const Singup = () => {
  type userInterface = {
    password: string;
    confirmPassword: string;
    email: string;
    name: string;
  };
  const [state, setState] = useState<userInterface>({
    password: "",
    confirmPassword: "",
    email: "",
    name: "",
  });

  const navigate = useNavigate();

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setState({ ...state, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      if (state.confirmPassword !== state.password) {
        throw new Error("Senhas não conferem");
      }

      const response = await axiosApi.post("/signup", state);

      console.log(response.data);

      navigate("/login");
    } catch (error) {
      console.error(error);
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
        name="name"
        label="Nome"
        value={state.name}
        onChange={handleChange}
      />
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
        label="Senha"
        type="password"
        onChange={handleChange}
        value={state.password}
      />
      <TextField
        required
        name="confirmPassword"
        label="Confirmar Senha"
        type="password"
        onChange={handleChange}
        value={state.confirmPassword}
      />
      <Button variant="contained" type="submit">
        Cadastrar
      </Button>
    </Box>
  );
};

export default Singup;
