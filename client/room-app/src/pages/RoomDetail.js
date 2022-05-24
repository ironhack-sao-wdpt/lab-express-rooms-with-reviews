import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import api from "../apis/api";

import NewReview from "../components/NewReview";

function RoomDetail() {
  const [room, setRoom] = useState({
    name: "",
    description: "",
    imageUrl: "",
    reviews: [],
  });

  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get(`/rooms/${id}`);
        setRoom({ ...response.data });
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, [id]);

  const { name, description, imageUrl, reviews } = room;

  return (
    <div className="container container-fluid d-flex flex-column align-items-center mt-3 px-0">
      <div className="container d-flex justify-content-between p-0 mx-1 px-1">
        <div>
          {/* DESCOMENTAR DEPOIS QUE CRIAR BOTOES */}
          {/* <Link className="btn btn-secondary" to={`/edit-post/${id}`}>
            <Edit />
          </Link> */}
          {/* <Link className="btn btn-danger ms-1" to={`/delete-post/${id}`}>
            <TrashCan />
          </Link> */}
        </div>
      </div>
      <div className="d-flex flex-column flex-sm-column flex-md-column flex-lg-row justify-content-center my-2 px-3 mx-1 border bg-white">
        <img
          className="card-img-top img-fluid my-3"
          src={imageUrl}
          alt={name}
          style={{ maxWidth: "500px", maxHeight: "500px", objectFit: "cover" }}
        />
        <div className="card-body d-flex flex-column justify-content-between">
          <div>
            <h1 className="">{name}</h1>
            <p>{description}</p>
          </div>
        </div>
      </div>
      <NewReview postId={id} />
      <div className="mx-1 px-1" style={{ width: "100%" }}>
        <ul className="list-group">
          {reviews.map((review) => (
            <li
              className="list-group-item d-flex justify-content-between p-0"
              key={review._id}
            >
              <p className="p-1 m-1">{review.comment}</p>
              {/* <button
              className="btn btn-outline-danger "
              style={{ border: "none", width: "42px", height: "40px" }}
              onClick={() => handleClick(review._id)}
            >
              Delete
            </button> */}
            </li>
          ))}
        </ul>
      </div>
      {/* AQUI VAO OS REVIEWS <NewComment postId={id} />
      <ListComment postId={id} /> */}
    </div>
  );
}

export default RoomDetail;
