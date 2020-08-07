import React from "react";
import { Radio } from "@material-ui/core";

const RadioButton = (props) => {
  return (
    <Radio
      color="primary"
      name={props.name}
      value={props.value}
      checked={props.checked}
      onChange={props.onChange}
    />
  );
};

export default RadioButton;
