import React from "react";
import { Select, MenuItem } from "@material-ui/core";

const SelectField = (props) => {
  return (
    <Select
      name={props.name}
      value={props.value}
      onChange={props.onChange}
    >
      <MenuItem value="">
        <em>None</em>
      </MenuItem>
      {props.data.map((degree, index) => {
        return (
          <MenuItem key={index} value={degree}>
            {degree}
          </MenuItem>
        );
      })}
    </Select>
  );
};

export default SelectField;
