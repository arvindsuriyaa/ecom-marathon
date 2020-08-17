import React, { useEffect, useState } from "react";
import {
  Grid,
  FormControl,
  InputLabel,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import InputField from "../common/InputField";
import { bindDispatch } from "../../utils";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { communicationStyle } from "../../styles/FormStyles";
import _ from "lodash";
import instance from "../../utils/api/apiAction";
import SelectField from "../common/SelectField";

const AddressDetails = (props) => {
  const classes = communicationStyle();
  const { reducer, actions, apiData } = props;
  const { handleData, handleCheckbox, stepperCheck } = actions;
  const { addressDetails } = reducer;
  const { address, stateId, districtId, pincode, country } = addressDetails;
  const [district, setDistrict] = useState([]);
  let userInfo = { address, stateId, districtId, pincode, country };
  let index = 1;
  let detail = "addressDetails";

  useEffect(() => {
    assignDistrict(addressDetails.stateId);
    stepperCheck("addressDetails", index, userInfo);
  }, []);

  const assignDistrict = async (id) => {
    if (id) {
      let districtCollection = await instance.get(`/districts/${id}`);
      setDistrict(districtCollection.data);
    } else {
      setDistrict([]);
    }
  };

  return (
    <div className={classes.addressRoot}>
      <div className={classes.title}>Communication Address</div>
      <Grid className={classes.grid} container spacing={3}>
        <Grid item xs={12} sm={12}>
          <InputField
            type="text"
            label="Address"
            name="address"
            value={addressDetails.address}
            onChange={(event) => handleData(event, index, detail, userInfo)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField
            type="text"
            label="Country"
            name="country"
            value={addressDetails.country}
            onChange={(event) => handleData(event, index, detail, userInfo)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl
            variant="filled"
            className={classes.formControl}
            fullWidth={true}
          >
            <InputLabel>State</InputLabel>
            <SelectField
              name="stateId"
              value={addressDetails.stateId}
              onChange={async (event) => {
                handleData(event, index, detail, userInfo);
                addressDetails["districtId"] = null;
                actions.assignData("addressDetails", addressDetails);
                await assignDistrict(addressDetails.stateId);
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
              value={addressDetails.districtId}
              onChange={(event) => {
                handleData(event, index, detail, userInfo);
              }}
              data={district}
              disabled={addressDetails.stateId === null}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField
            type="number"
            label="Pincode"
            name="pincode"
            value={addressDetails.pincode}
            onChange={(event) => handleData(event, index, detail, userInfo)}
          />
        </Grid>
      </Grid>
      <div className={classes.content}>
        <FormControlLabel
          control={
            <Checkbox
              checked={addressDetails.type === 2}
              name="permanentAddressCheck"
              onChange={(event) => handleCheckbox(event, index, detail)}
              color="primary"
            />
          }
          label="Permanent Address is same as Communication address"
        />
      </div>
    </div>
  );
};

const mapStateToProps = createSelector(
  (state) => state.reducer,
  (reducer) => ({ reducer })
);

export default connect(mapStateToProps, bindDispatch)(AddressDetails);
