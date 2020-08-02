import React from "react";
import "./App.css";
import Root from "./Root";
import { AppBar, Typography, Toolbar } from "@material-ui/core";

function App() {
  return (
    <div>
      <AppBar position="static" style={{ background: "blue" }}>
        <Toolbar>
          <Typography variant="h6">License Form</Typography>
        </Toolbar>
      </AppBar>
      <Root />
    </div>
  );
}

export default App;
