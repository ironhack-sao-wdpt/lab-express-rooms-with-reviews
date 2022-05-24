import { useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../apis/api";
import { AuthContext } from "../contexts/authContext";

function RoomDelete() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useContext(AuthContext);

  useEffect(() => {
    const really = window.confirm("Are you sure you want to delete this room?");

    async function fetchData() {
      try {
        const response = await api.delete(`/rooms/${id}`);
        console.log(response);
      } catch (err) {
        console.error(err);
      }
    }
    if (really) {
      fetchData();
    }
    navigate(-1);
  }, [id]);

  return (
    <div>
      <h1>Deleting room...</h1>
    </div>
  );
}

export default RoomDelete;
