import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import DeleteModal from "./DeleteModal";
import axiosApi from "../apis/axiosApi";

type reviewInterface = {
  comment: string;
  _id: string | number;
  roomId: string | number;
};
type roomInterface = {
  name: string;
  description: string;
  imageUrl: string;
  _id: string | number;
  createdBy: string;
  reviews: reviewInterface[];
};

const RoomCards = (props: {
  room: roomInterface;
  buttons: { text: string; link: string }[];
}) => {
  const { name, description, imageUrl, _id, createdBy } = props.room;
  const { buttons } = props;
  const [open, setOpen] = React.useState(false);
  const [loggedInUser] = React.useContext(AuthContext);
  const navigate = useNavigate();

  async function handleDelete() {
    try {
      const deleted = await axiosApi.delete(`/room/${_id}`);
      console.log(deleted);
      navigate(0);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <Card sx={{ maxWidth: 400, minWidth: 250, minHeight: 350 }}>
      <DeleteModal open={open} setOpen={setOpen} handleDelete={handleDelete} />
      <CardActionArea>
        <CardMedia component="img" height="140" image={imageUrl} alt={name} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Dono: {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {buttons.map((element) => (
          <Link to={`${element.link}${_id}`}>{element.text}</Link>
        ))}

        {createdBy === loggedInUser.user._id && (
          <Button onClick={() => setOpen(!open)}>Deletar</Button>
        )}
      </CardActions>
    </Card>
  );
};

export default RoomCards;
