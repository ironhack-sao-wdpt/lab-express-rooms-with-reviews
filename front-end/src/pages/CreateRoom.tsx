import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axiosApi from "../apis/axiosApi";
import { Navigate, useNavigate } from "react-router-dom";
import { height } from "@mui/system";
import { Typography } from "@mui/material";
import { AuthContext } from "../context/authContext";

const CreateRoom = () => {
  type roomInterface = {
    name: string;
    description: string;
    imageUrl: string;
    createdBy: string;
  };

  const [state, setState] = useState<roomInterface>({
    description: "",
    imageUrl: "",
    name: "",
    createdBy: "",
  });

  const [loggedInUser] = useContext(AuthContext);
  const navigate = useNavigate();

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setState({ ...state, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const response = await axiosApi.post("/room", {
        ...state,
        createdBy: loggedInUser.user._id,
      });

      console.log(response.data);

      navigate("/myrooms");
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
      <Typography variant="h2">Criar Quarto</Typography>
      <TextField
        required
        name="name"
        label="Nome"
        value={state.name}
        onChange={handleChange}
      />
      <TextField
        required
        name="imageUrl"
        label="Imagem"
        onChange={handleChange}
        value={state.imageUrl}
      />
      <TextField
        required
        name="description"
        label="Descricacao"
        type="text"
        multiline
        rows={4}
        onChange={handleChange}
        value={state.description}
      />

      <Button variant="contained" type="submit">
        Cadastrar
      </Button>
    </Box>
  );
};

export default CreateRoom;
