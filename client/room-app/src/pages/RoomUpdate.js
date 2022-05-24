import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../apis/api";

import FormControl from "../components/FormControl";
import FormButton from "../components/FormButton";

function RoomUpdate() {
  const [state, setState] = useState({
    name: "",
    description: "",
    imageUrl: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await api.get(`/rooms/${id}`);

        console.log(response);

        setState({ ...response.data });
      } catch (err) {
        console.error(err);
      }
    }
    fetchPost();
  }, [id]);

  function handleChange(event) {
    setState({ ...state, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const data = { ...state };
      delete data._id;

      const response = await api.patch(`/rooms/${id}`, data);
      console.log(response);

      navigate(-1);
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
        <FormButton>Update Room</FormButton>
      </form>
    </div>
  );
}

export default RoomUpdate;
