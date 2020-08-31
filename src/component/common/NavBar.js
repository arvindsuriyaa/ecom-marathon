import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import variables from "../../styles/_variables.scss";

const NavBar = () => {
  return (
    <AppBar position="static" style={{background:variables.commonTheme}}>
      <Toolbar>
        <Typography variant="h6">License Form</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
