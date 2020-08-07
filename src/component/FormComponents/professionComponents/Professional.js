import React, { useEffect } from "react";
import { FormControl, InputLabel, Grid } from "@material-ui/core";
import { bindDispatch } from "../../../utils";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { professionalForm } from "../../../styles/FormStyles";
import { salary, level } from "../../../utils/productSeed";
import SelectField from "../../common/SelectField";

const Professional = (props) => {
  const classes = professionalForm();
  const { actions, reducer } = props;
  const { checkEmptyField } = actions;
  const { handleData } = actions;
  const { professionalDetails, isCompleted } = reducer;
  let detail = "professional";
  let index = 2;

  useEffect(() => {
    let data = Object.entries(professionalDetails);
    let validationCount = 0;
    async function checkField() {
      let count = await checkEmptyField(
        data,
        professionalDetails,
        validationCount
      );
      if (count === data.length) {
        isCompleted[2] = false;
      }
      let professionType = "professional";
      actions.assignData("profession", professionType);
      actions.assignData("isCompleted", isCompleted);
    }
    checkField();
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
            <SelectField
              name="salary"
              value={professionalDetails.salary}
              onChange={(event) => handleData(event, index, detail)}
              data={salary}
            />
          </FormControl>
        </Grid>{" "}
        <Grid item sm={6}>
          <FormControl
            variant="filled"
            className={classes.formControl}
            fullWidth="true"
          >
            <InputLabel id="demo-simple-select-filled-label">Level</InputLabel>
            <SelectField
              name="level"
              value={professionalDetails.level}
              onChange={(event) =>  handleData(event, index, detail)}
              data={level}
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
