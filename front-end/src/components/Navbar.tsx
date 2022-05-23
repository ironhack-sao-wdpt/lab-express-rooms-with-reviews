import { Link, NavLink } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar style={{ justifyContent: "space-between" }}>
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <Typography variant="h6" component="div">
              News
            </Typography>
          </Link>
          <Box display="flex" flexGrow={1} justifyContent="flex-end">
            <NavLink
              to="/login"
              style={{ textDecoration: "none", color: "white", marginLeft: 5 }}
            >
              {" "}
              <Typography variant="h6" component="div">
                Login
              </Typography>
            </NavLink>
            <NavLink
              to="/signup"
              style={{ textDecoration: "none", color: "white", marginLeft: 10 }}
            >
              {" "}
              <Typography variant="h6" component="div">
                Signup
              </Typography>
            </NavLink>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
