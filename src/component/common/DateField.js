import React from "react";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { KeyboardDatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const DateField = (props) => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        clearable
        inputVariant="filled"
        label="Date of Birth"
        value={props.value}
        fullWidth={true}
        name="dob"
        onChange={props.onChange}
        format="dd/MM/yyyy"
      />
    </MuiPickersUtilsProvider>
  );
};

export default DateField;
