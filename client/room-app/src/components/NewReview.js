import { useState } from "react";
import api from "../apis/api";

function NewReview(props) {
  const [state, setState] = useState({
    comment: "",
    roomId: props.postId,
  });

  function handleChange(event) {
    setState({ ...state, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();

    api.post("/review-create", state).then((response) => {
      window.location.reload();
      console.log(response.data);
    });
  }
  return (
    <form className="input-group mb-3 mx-1 px-1" onSubmit={handleSubmit}>
      <input
        className="form-control"
        id="newcomment"
        name="comment"
        onChange={handleChange}
        value={state.comment}
        placeholder="Leave a review"
      />
      <div className="input-group-append">
        <button type="submit" className="btn text-light btn-secondary">
          Post review
        </button>
      </div>
    </form>
  );
}

export default NewReview;
