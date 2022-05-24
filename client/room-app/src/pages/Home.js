import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../contexts/authContext";
import api from "../apis/api";

function Home() {
  const [rooms, setRooms] = useState([]);

  const [loggedInUser] = useContext(AuthContext);

  useEffect(() => {
    async function fetchRooms() {
      try {
        const response = await api.get("/rooms");

        setRooms([...response.data]);
      } catch (err) {
        console.error(err);
      }
    }

    fetchRooms();
  }, [loggedInUser.token]);

  return (
    <div>
      <div className="row">
        {rooms.map((room) => {
          const { _id, name, description, imageUrl } = room;

          return (
            <div key={_id} className="col-4">
              <div className="card" style={{ width: "18rem" }}>
                <img src={imageUrl} className="card-img-top" alt={name} />
                <div className="card-body">
                  <h5 className="card-title">{name}</h5>
                  {/* <p className="card-text">{description}</p> */}
                  <Link
                    to={`/rooms/${_id}`}
                    className="btn btn-secondary text-white"
                  >
                    See more
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
