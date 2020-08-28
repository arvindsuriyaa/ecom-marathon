import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import InputField from "../../../common/InputField";
import { bindDispatch } from "../../../../utils";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { studentForm } from "../../../../styles/FormStyles";
import SelectField from "../../../common/SelectField";
import * as fetchApi from "../../../../api/apiAction";
import _ from "lodash";

const Student = (props) => {
  const { actions, reducer } = props;
  const { handleData, stepperCheck } = actions;
  const { qualificationDetails } = reducer;
  const clonedDetails = _.cloneDeep(qualificationDetails);
  const classes = studentForm();
  const {
    id,
    userId,
    annumSal,
    levelId,
    ...studentInfo
  } = qualificationDetails;
  const [district, setDistrict] = useState([]);
  let detail = "qualificationDetails";
  let index = 2;

  const assignStepper = () => {
    stepperCheck(index, studentInfo);
  };

  useEffect(assignStepper, [qualificationDetails]);

  const assignDistrict = async (id) => {
    if (id) {
      let districtCollection = await fetchApi.instance.get(`/districts/${id}`);
      setDistrict(districtCollection.data);
    } else {
      setDistrict([]);
    }
  };

  useEffect(() => {
    if (qualificationDetails.stateId !== null) {
      assignDistrict(qualificationDetails.stateId);
    }
  }, [qualificationDetails.stateId]);

  return (
    <div className={classes.root}>
      <Grid className={classes.grid} container spacing={3}>
        <SelectField
          sm={12}
          className={classes.formControl}
          labelName="Current Qualification"
          name="userQualificationId"
          value={qualificationDetails.userQualificationId || ""}
          onChange={(event) => handleData(event, index, detail, studentInfo)}
          data={props.apiData[3]}
        />
        <InputField
          sm={6}
          type="text"
          label="Institution Name"
          name="institutionName"
          value={qualificationDetails.institutionName || ""}
          onChange={(event) => handleData(event, index, detail, studentInfo)}
        />
        <InputField
          sm={6}
          type="text"
          label="Studying at"
          name="studyingAt"
          value={qualificationDetails.studyingAt || ""}
          onChange={(event) => handleData(event, index, detail, studentInfo)}
        />
        <InputField
          sm={12}
          type="text"
          label="Institution Address"
          name="institutionAddress"
          value={qualificationDetails.institutionAddress || ""}
          onChange={(event) => handleData(event, index, detail, studentInfo)}
        />
        <InputField
          sm={6}
          type="text"
          label="Country"
          name="country"
          value={qualificationDetails.country || ""}
          onChange={(event) => handleData(event, index, detail, studentInfo)}
        />
        <SelectField
          sm={6}
          className={classes.formControl}
          labelName="State"
          name="stateId"
          value={qualificationDetails.stateId || ""}
          onChange={(event) => {
            handleData(event, index, detail, studentInfo);
            assignDistrict(clonedDetails.stateId);
          }}
          data={props.apiData[2] || []}
        />
        <SelectField
          sm={6}
          className={classes.formControl}
          labelName="District"
          name="districtId"
          value={studentInfo.districtId || ""}
          onChange={(event) => {
            handleData(event, index, detail, studentInfo);
          }}
          data={district}
          disabled={qualificationDetails.stateId === null}
        />
        <InputField
          sm={6}
          type="number"
          label="Pincode"
          name="pincode"
          value={qualificationDetails.pincode || ""}
          onChange={(event) => handleData(event, index, detail, studentInfo)}
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
