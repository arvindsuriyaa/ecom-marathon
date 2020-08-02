import React from "react";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const Table = () => {
  let history = useHistory();
  return (
    <div>
      This is Table. click here for{" "}
      <Button onClick={()=>history.push("/Form")}>Form</Button>
    </div>
  );
};

export default Table;
