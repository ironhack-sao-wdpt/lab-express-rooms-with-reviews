import { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../apis/api";

import FormControl from "../components/FormControl";
import FormButton from "../components/FormButton";

function RoomCreate() {
  const [state, setState] = useState({
    name: "",
    description: "",
    imageUrl: "",
  });

  const navigate = useNavigate();

  function handleChange({ target }) {
    const { name, value } = target;
    setState({ ...state, [name]: value });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await api.post("/room-create", state);
      console.log(response);

      navigate("/");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <h1>New room </h1>
      <form onSubmit={handleSubmit}>
        <FormControl
          label="Name"
          id="createRoomFormName"
          name="name"
          value={state.name}
          onChange={handleChange}
        />
        <FormControl
          label="Image"
          id="createRoomFormImage"
          name="imageUrl"
          value={state.imageUrl}
          onChange={handleChange}
        />
        <FormControl
          label="Description"
          id="createRoomFormDescription"
          name="description"
          value={state.description}
          onChange={handleChange}
        />
        <FormButton>Create Room</FormButton>
      </form>
    </div>
  );
}

export default RoomCreate;
