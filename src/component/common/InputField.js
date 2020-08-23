import React from "react";
import { TextField, Grid } from "@material-ui/core";

const InputField = (props) => {
  return (
    <Grid item xs={12} sm={props.sm} className={props.className}>
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
    </Grid>
  );
};

export default InputField;
