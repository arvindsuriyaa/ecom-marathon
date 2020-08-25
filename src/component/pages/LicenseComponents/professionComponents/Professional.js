/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Grid } from "@material-ui/core";
import { bindDispatch } from "../../../../utils";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { professionalForm } from "../../../../styles/FormStyles";
import SelectField from "../../../common/SelectField";

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
    stepperCheck(index, userInfo);
  }, []);
  
  useEffect(() => {
    stepperCheck(index, userInfo);
  }, [qualificationDetails]);

  return (
    <div className={classes.root}>
      <Grid className={classes.grid} container spacing={3}>
        <SelectField
          sm={6}
          className={classes.formControl}
          labelName="Salary Per Annum"
          name="annumSal"
          value={qualificationDetails.annumSal}
          onChange={(event) => handleData(event, index, detail, userInfo)}
          data={apiData[0]}
        />
        <SelectField
          sm={6}
          className={classes.formControl}
          labelName="Level"
          name="levelId"
          value={qualificationDetails.levelId}
          onChange={(event) => handleData(event, index, detail, userInfo)}
          data={apiData[1]}
        />
      </Grid>
    </div>
  );
};

const mapStateToProps = createSelector(
  (state) => state.reducer,
  (reducer) => ({ reducer })
);

export default connect(mapStateToProps, bindDispatch)(Professional);
