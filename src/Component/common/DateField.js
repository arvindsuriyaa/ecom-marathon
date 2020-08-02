import React, { useState } from "react";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { KeyboardDatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const DateField = () => {
  const [selectedDate, handleDateChange] = useState(new Date());
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        clearable
        inputVariant="filled"
        label="Date of Birth"
        value={selectedDate}
        fullWidth="true"
        onChange={(date) => handleDateChange(date)}
        format="dd/MM/yyyy"
      />
    </MuiPickersUtilsProvider>
  );
};

export default DateField;
