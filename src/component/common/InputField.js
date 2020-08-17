import React from "react";
import { TextField } from "@material-ui/core";

const InputField = (props) => {
  return (
    <TextField
      error={props.error}
      disabled={props.disabled}
      helperText={props.helperText}
      type={props.type}
      value={props.value}
      label={props.label}
      name={props.name}
      variant="filled"
      fullWidth={true}
      onChange={props.onChange}
    />
  );
};

export default InputField;
