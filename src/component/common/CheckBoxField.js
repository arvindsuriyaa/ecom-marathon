import React from "react";
import { Grid, FormControlLabel, Checkbox } from "@material-ui/core";

const CheckBoxField = (props) => {
  return (
    <Grid item sm={props.sm}>
      <FormControlLabel
        control={
          <Checkbox
            checked={props.checked}
            onChange={props.onChange}
            color="primary"
          />
        }
        label={props.label}
      />
    </Grid>
  );
};

export default CheckBoxField;
