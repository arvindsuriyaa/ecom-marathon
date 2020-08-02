import React, { useEffect } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from "@material-ui/core";
import { bindDispatch } from "../../../utils";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { professionalForm } from "../../../styles/FormStyles";
import { salary, level } from "../../../utils/productSeed";

const Professional = (props) => {
  const classes = professionalForm();
  const { actions, reducer } = props;
  const { handleData } = actions;
  const { professionalDetails, isCompleted } = reducer;
  let detail = "professional";
  let index = 2;

  useEffect(() => {
    isCompleted[2] = false;
    actions.assignData("isCompleted", isCompleted);
  }, []);

  return (
    <div className={classes.root}>
      <Grid className={classes.grid} container spacing={3}>
        <Grid item sm={6}>
          <FormControl
            variant="filled"
            className={classes.formControl}
            fullWidth="true"
          >
            <InputLabel id="demo-simple-select-filled-label">
              Salary Per Annum
            </InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              name="salary"
              value={professionalDetails.salary}
              onChange={(event) => handleData(event, index, detail)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {salary.map((degree, index) => {
                return (
                  <MenuItem key={index} value={degree}>
                    {degree}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>{" "}
        <Grid item sm={6}>
          <FormControl
            variant="filled"
            className={classes.formControl}
            fullWidth="true"
          >
            <InputLabel id="demo-simple-select-filled-label">Level</InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              name="level"
              value={professionalDetails.level}
              onChange={(event) => handleData(event, index, detail)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {level.map((degree, index) => {
                return (
                  <MenuItem key={index} value={degree}>
                    {degree}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = createSelector(
  (state) => state.reducer,
  (reducer) => ({ reducer })
);

export default connect(mapStateToProps, bindDispatch)(Professional);
