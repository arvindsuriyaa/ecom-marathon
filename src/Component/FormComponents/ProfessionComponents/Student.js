import React, { useEffect } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from "@material-ui/core";
import InputField from "../../common/InputField";
import { bindDispatch } from "../../../utils";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { studentForm } from "../../../styles/FormStyles";
import { graduateLevel, state, district } from "../../../utils/productSeed";

const Student = (props) => {
  const { actions, reducer } = props;
  const { handleData } = actions;
  const { studentDetails, isCompleted } = reducer;
  const classes = studentForm();
  let detail = "student";
  let index = 2;

  useEffect(() => {
    isCompleted[2] = false;
    actions.assignData("isCompleted", isCompleted);
  }, []);

  return (
    <div className={classes.root}>
      <Grid className={classes.grid} container spacing={3}>
        <Grid item sm={12}>
          <FormControl
            variant="filled"
            className={classes.formControl}
            fullWidth="true"
          >
            <InputLabel id="demo-simple-select-filled-label">
              Current Qualification
            </InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              //   value={age}
              name="qualification"
              value={studentDetails.qualification}
              onChange={(event) => handleData(event, index, detail)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {graduateLevel.map((degree, index) => {
                return (
                  <MenuItem key={index} value={degree}>
                    {degree}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField
            type="text"
            label="Institution Name"
            name="institution"
            value={studentDetails.institution}
            onChange={(event) => handleData(event, index, detail)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField
            type="text"
            label="Studying at"
            name="class"
            value={studentDetails.class}
            onChange={(event) => handleData(event, index, detail)}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <InputField
            type="text"
            label="Institution Address"
            name="address"
            value={studentDetails.address}
            onChange={(event) => handleData(event, index, detail)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField
            type="text"
            label="Country"
            name="country"
            value={studentDetails.country}
            onChange={(event) => handleData(event, index, detail)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl
            variant="filled"
            className={classes.formControl}
            fullWidth="true"
          >
            <InputLabel id="demo-simple-select-filled-label">State</InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              name="state"
              value={studentDetails.state}
              onChange={(event) => handleData(event, index, detail)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {state.map((degree, index) => {
                return (
                  <MenuItem key={index} value={degree}>
                    {degree}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl
            variant="filled"
            className={classes.formControl}
            fullWidth="true"
          >
            <InputLabel id="demo-simple-select-filled-label">
              District
            </InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              name="district"
              value={studentDetails.district}
              onChange={(event) => handleData(event, index, detail)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {district.map((degree, index) => {
                return (
                  <MenuItem key={index} value={degree}>
                    {degree}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField
            type="text"
            label="Pincode"
            name="pincode"
            value={studentDetails.pincode}
            onChange={(event) => handleData(event, index, detail)}
          />
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = createSelector(
  (state) => state.reducer,
  (reducer) => ({ reducer })
);

export default connect(mapStateToProps, bindDispatch)(Student);
