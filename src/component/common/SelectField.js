import React from "react";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
} from "@material-ui/core";

const SelectField = (props) => {
  return (
    <Grid item xs={12} sm={props.sm}>
      <FormControl
        variant="filled"
        fullWidth={true}
        className={props.className}
      >
        <InputLabel>{props.labelName}</InputLabel>
        <Select
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          disabled={props.disabled}
        >
          <MenuItem value={null}>
            <em>None</em>
          </MenuItem>
          {props.data &&
            props.data.map((item, index) => {
              return (
                <MenuItem key={index} value={item.id}>
                  {item.name}
                </MenuItem>
              );
            })}
        </Select>
      </FormControl>
    </Grid>
  );
};

export default SelectField;
