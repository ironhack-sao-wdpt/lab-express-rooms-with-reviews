import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Typography from "@mui/material/Typography";
import React from "react";

type reviewInterface = {
  comment: string;
  _id: string | number;
  roomId: string | number;
};

const ReviewList = (props: { list: reviewInterface[] }) => {
  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {props.list?.map((element) => {
        return (
          <React.Fragment>
            <ListItem alignItems="flex-start">
              <ListItemText
                primary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {element.comment}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider component="li" />
          </React.Fragment>
        );
      })}
    </List>
  );
};

export default ReviewList;
