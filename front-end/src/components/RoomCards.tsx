import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";

type roomInterface = {
  name: string;
  description: string;
  imageUrl: string;
  _id: string | number;
  reviews: [{ comment: string; _id: string | number; roomId: string | number }];
};

const RoomCards = (props: { room: roomInterface; buttons: string[] }) => {
  const { name, description, imageUrl, _id, reviews } = props.room;
  const { buttons } = props;

  return (
    <Card sx={{ maxWidth: 400, minHeight: 300 }}>
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
          <Button size="small" color="primary">
            {element}
          </Button>
        ))}
      </CardActions>
    </Card>
  );
};

export default RoomCards;
