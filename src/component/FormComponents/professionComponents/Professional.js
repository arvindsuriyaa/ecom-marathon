import React, { useEffect } from "react";
import { FormControl, InputLabel, Grid } from "@material-ui/core";
import { bindDispatch } from "../../../utils";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { professionalForm } from "../../../styles/FormStyles";
import SelectField from "../../common/SelectField";

const Professional = (props) => {
  const classes = professionalForm();
  const { actions, reducer, apiData } = props;
  const { handleData, stepperCheck } = actions;
  const { qualificationDetails } = reducer;
  let detail = "qualificationDetails";
  let index = 2;
  const { annumSal, levelId } = qualificationDetails;
  const userInfo = { annumSal, levelId };

  useEffect(() => {
    stepperCheck("student", index, userInfo);
  }, []);

  return (
    <div className={classes.root}>
      <Grid className={classes.grid} container spacing={3}>
        <Grid item sm={6}>
          <FormControl
            variant="filled"
            className={classes.formControl}
            fullWidth={true}
          >
            <InputLabel id="demo-simple-select-filled-label">
              Salary Per Annum
            </InputLabel>
            <SelectField
              name="annumSal"
              value={qualificationDetails.annumSal}
              onChange={(event) => handleData(event, index, detail, userInfo)}
              data={apiData.annualSalary}
            />
          </FormControl>
        </Grid>{" "}
        <Grid item sm={6}>
          <FormControl
            variant="filled"
            className={classes.formControl}
            fullWidth={true}
          >
            <InputLabel id="demo-simple-select-filled-label">Level</InputLabel>
            <SelectField
              name="levelId"
              value={qualificationDetails.levelId}
              onChange={(event) => handleData(event, index, detail, userInfo)}
              data={apiData.level}
            />
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
