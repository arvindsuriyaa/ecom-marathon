/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import InputField from "../../../common/InputField";
import { bindDispatch } from "../../../../utils";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { studentForm } from "../../../../styles/FormStyles";
import SelectField from "../../../common/SelectField";
import * as fetchApi from "../../../../api/apiAction";

const Student = (props) => {
  const { actions, reducer } = props;
  const { handleData, stepperCheck } = actions;
  const { qualificationDetails } = reducer;
  const classes = studentForm();
  const { id, userId, annumSal, levelId, ...userInfo } = qualificationDetails;
  let detail = "qualificationDetails";
  let index = 2;

  useEffect(() => {
    assignDistrict(qualificationDetails.stateId);
    stepperCheck("student", index, userInfo);
  }, []);

  const [district, setDistrict] = useState([]);

  const assignDistrict = async (id) => {
    if (id) {
      let districtCollection = await fetchApi.instance.get(`/districts/${id}`);
      setDistrict(districtCollection.data);
    } else {
      setDistrict([]);
    }
  };

  return (
    <div className={classes.root}>
      <Grid className={classes.grid} container spacing={3}>
        <SelectField
          sm={12}
          className={classes.formControl}
          labelName="Current Qualification"
          name="userQualificationId"
          value={qualificationDetails.userQualificationId}
          onChange={(event) => handleData(event, index, detail, userInfo)}
          data={props.apiData[3]}
        />
        <InputField
          sm={6}
          type="text"
          label="Institution Name"
          name="institutionName"
          value={qualificationDetails.institutionName}
          onChange={(event) => handleData(event, index, detail, userInfo)}
        />
        <InputField
          sm={6}
          type="text"
          label="Studying at"
          name="studyingAt"
          value={qualificationDetails.studyingAt}
          onChange={(event) => handleData(event, index, detail, userInfo)}
        />
        <InputField
          sm={12}
          type="text"
          label="Institution Address"
          name="institutionAddress"
          value={qualificationDetails.institutionAddress}
          onChange={(event) => handleData(event, index, detail, userInfo)}
        />
        <InputField
          sm={6}
          type="text"
          label="Country"
          name="country"
          value={qualificationDetails.country}
          onChange={(event) => handleData(event, index, detail, userInfo)}
        />
        <SelectField
          sm={6}
          className={classes.formControl}
          labelName="State"
          name="stateId"
          value={qualificationDetails.stateId}
          onChange={async (event) => {
            handleData(event, index, detail, userInfo);
            qualificationDetails["districtId"] = null;
            actions.assignData("qualificationDetails", qualificationDetails);
            await assignDistrict(qualificationDetails.stateId);
          }}
          data={props.apiData[2] || []}
        />
        <SelectField
          sm={6}
          className={classes.formControl}
          labelName="District"
          name="districtId"
          value={userInfo.districtId}
          onChange={(event) => {
            handleData(event, index, detail, userInfo);
          }}
          data={district}
          disabled={qualificationDetails.stateId === null}
        />
        <InputField
          sm={6}
          type="number"
          label="Pincode"
          name="pincode"
          value={qualificationDetails.pincode}
          onChange={(event) => handleData(event, index, detail, userInfo)}
        />
      </Grid>
    </div>
  );
};

const mapStateToProps = createSelector(
  (state) => state.reducer,
  (reducer) => ({ reducer })
);

export default connect(mapStateToProps, bindDispatch)(Student);
