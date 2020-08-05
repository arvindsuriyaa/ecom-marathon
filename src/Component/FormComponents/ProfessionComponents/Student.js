import React, { useEffect } from "react";
import { FormControl, InputLabel, Grid } from "@material-ui/core";
import InputField from "../../common/InputField";
import { bindDispatch } from "../../../utils";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { studentForm } from "../../../styles/FormStyles";
import { graduateLevel, state, district } from "../../../utils/productSeed";
import SelectField from "../../common/SelectField";

const Student = (props) => {
  const { actions, reducer } = props;
  const { checkEmptyField } = actions;
  const { handleData } = actions;
  const { studentDetails, isCompleted } = reducer;
  const classes = studentForm();
  let detail = "student";
  let index = 2;

  useEffect(() => {
    let validationCount = 0;
    let data = Object.entries(studentDetails);
    async function checkField() {
      let count = await checkEmptyField(data, studentDetails, validationCount);

      if (count === data.length) {
        isCompleted[2] = false;
      }
      let professionType = "student";

      actions.assignData("profession", professionType);
      actions.assignData("isCompleted", isCompleted);
    }
    checkField();
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
            <SelectField
              name="qualification"
              value={studentDetails.qualification}
              onChange={(event) => handleData(event, index, detail)}
              data={graduateLevel}
            />
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
            <SelectField
              name="state"
              value={studentDetails.state}
              onChange={(event) => handleData(event, index, detail)}
              data={state}
            />
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
            <SelectField
              name="district"
              value={studentDetails.district}
              onChange={(event) => handleData(event, index, detail)}
              data={district}
            />
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
