import React from "react";
import { Select, MenuItem } from "@material-ui/core";

const SelectField = (props) => {
  console.log(props);
  return (
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
  );
};

export default SelectField;
