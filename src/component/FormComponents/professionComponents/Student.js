import React, { useEffect, useState } from "react";
import { FormControl, InputLabel, Grid } from "@material-ui/core";
import InputField from "../../common/InputField";
import { bindDispatch } from "../../../utils";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { studentForm } from "../../../styles/FormStyles";
import SelectField from "../../common/SelectField";
import instance from "../../../utils/api/apiAction";

const Student = (props) => {
  const { actions, reducer, apiData } = props;
  const { handleData, stepperCheck } = actions;
  const { qualificationDetails } = reducer;
  const {
    userQualificationId,
    studyingAt,
    stateId,
    pincode,
    institutionName,
    institutionAddress,
    districtId,
    country,
  } = qualificationDetails;
  const classes = studentForm();
  let detail = "qualificationDetails";
  let index = 2;
  let userInfo = {
    userQualificationId,
    studyingAt,
    stateId,
    pincode,
    institutionName,
    institutionAddress,
    districtId,
    country,
  };

  useEffect(() => {
    assignDistrict(qualificationDetails.stateId);
    stepperCheck("student", index, userInfo);
  }, []);

  const [district, setDistrict] = useState([]);

  const assignDistrict = async (id) => {
    if (id) {
      let districtCollection = await instance.get(`/districts/${id}`);
      setDistrict(districtCollection.data);
    } else {
      setDistrict([]);
    }
  };

  return (
    <div className={classes.root}>
      <Grid className={classes.grid} container spacing={3}>
        <Grid item sm={12}>
          <FormControl
            variant="filled"
            className={classes.formControl}
            fullWidth={true}
          >
            <InputLabel id="demo-simple-select-filled-label">
              Current Qualification
            </InputLabel>
            <SelectField
              name="userQualificationId"
              value={qualificationDetails.userQualificationId}
              onChange={(event) => handleData(event, index, detail, userInfo)}
              data={apiData.qualification}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField
            type="text"
            label="Institution Name"
            name="institutionName"
            value={qualificationDetails.institutionName}
            onChange={(event) => handleData(event, index, detail, userInfo)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField
            type="text"
            label="Studying at"
            name="studyingAt"
            value={qualificationDetails.studyingAt}
            onChange={(event) => handleData(event, index, detail, userInfo)}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <InputField
            type="text"
            label="Institution Address"
            name="institutionAddress"
            value={qualificationDetails.institutionAddress}
            onChange={(event) => handleData(event, index, detail, userInfo)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField
            type="text"
            label="Country"
            name="country"
            value={qualificationDetails.country}
            onChange={(event) => handleData(event, index, detail, userInfo)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl
            variant="filled"
            className={classes.formControl}
            fullWidth={true}
          >
            <InputLabel id="demo-simple-select-filled-label">State</InputLabel>
            <SelectField
              name="stateId"
              value={qualificationDetails.stateId}
              onChange={async (event) => {
                handleData(event, index, detail, userInfo);
                qualificationDetails["districtId"] = null;
                actions.assignData(
                  "qualificationDetails",
                  qualificationDetails
                );
                await assignDistrict(qualificationDetails.stateId);
              }}
              data={apiData.state}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl
            variant="filled"
            className={classes.formControl}
            fullWidth={true}
          >
            <InputLabel id="demo-simple-select-filled-label">
              District
            </InputLabel>
            <SelectField
              name="districtId"
              value={districtId}
              onChange={(event) => {
                handleData(event, index, detail, userInfo);
              }}
              data={district}
              disabled={qualificationDetails.stateId === null}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField
            type="number"
            label="Pincode"
            name="pincode"
            value={qualificationDetails.pincode}
            onChange={(event) => handleData(event, index, detail, userInfo)}
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
