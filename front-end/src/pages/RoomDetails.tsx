import { Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosApi from "../apis/axiosApi";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ReviewList from "../components/ReviewList";

const RoomDetails = () => {
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

  const [state, setState] = useState<roomInterface>({
    name: "",
    description: "",
    imageUrl: "",
    _id: "",
    createdBy: "",
    reviews: [{ comment: "", _id: "", roomId: "" }],
  });
  const { roomId } = useParams();

  useEffect(() => {
    (async function fetchRoom() {
      try {
        const response = await axiosApi.get(`/room/${roomId}`);
        setState({ ...response.data });
      } catch (error) {
        console.error(error);
      }
    })();
  }, [roomId]);

  console.log(state);

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        component="div"
        sx={{
          width: "80%",
          height: 500,
          backgroundImage: `url(${state.imageUrl})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          mt: 2,
        }}
      />
      <Box
        component="div"
        sx={{
          width: "100%",
          mt: 2,
        }}
      >
        <Typography variant="h3">{state.name}</Typography>
        <Typography variant="h5">
          Descricacao
          <Typography variant="body1">{state.description}</Typography>
        </Typography>
      </Box>
      <Box>
        <Typography variant="h3">Reviews</Typography>
        <ReviewList list={state.reviews} />
      </Box>
    </Container>
  );
};

export default RoomDetails;
