import React from "react";
import { FormControlLabel, Radio } from "@material-ui/core";

const RadioButton = (props) => {
  return (
    <FormControlLabel
      control={
        <Radio
          color="primary"
          name={props.name}
          value={props.value}
          checked={props.checked}
          onChange={props.onChange}
        />
      }
      label={props.itemName}
    />
  );
};

export default RadioButton;
