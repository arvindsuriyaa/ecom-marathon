import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";

const NavBar = () => {
  return (
    <AppBar position="static" style={{ background: "blue" }}>
      <Toolbar>
        <Typography variant="h6">License Form</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
