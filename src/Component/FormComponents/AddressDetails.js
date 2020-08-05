import React from "react";
import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import InputField from "../common/InputField";
import { bindDispatch } from "../../utils";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { communicationStyle } from "../../styles/FormStyles";
import { state, district } from "../../utils/productSeed";
import _ from "lodash";
import SelectField from "../common/SelectField";

const AddressDetails = (props) => {
  const classes = communicationStyle();
  const { reducer, actions } = props;
  const { handleData, handleCheckbox } = actions;
  const { addressDetails, permanentAddressCheck } = reducer;
  let index = 1;
  let detail = "addressDetails";

  return (
    <div className={classes.addressRoot}>
      <div className={classes.title}>Communication Address</div>
      <Grid className={classes.grid} container spacing={3}>
        <Grid item xs={12} sm={12}>
          <InputField
            type="text"
            label="Institution Address"
            name="institutionAddress"
            value={addressDetails.institutionAddress}
            onChange={(event) => handleData(event, index, detail)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField
            type="text"
            label="Country"
            name="country"
            value={addressDetails.country}
            onChange={(event) => handleData(event, index, detail)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl
            variant="filled"
            className={classes.formControl}
            fullWidth="true"
          >
            <InputLabel>State</InputLabel>
            <Select
              name="state"
              value={addressDetails.state}
              onChange={(event) => handleData(event, index, detail)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {state.map((state, index) => {
                return (
                  <MenuItem key={index} value={state}>
                    {state}
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
            <SelectField
              name="district"
              value={addressDetails.district}
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
            value={addressDetails.pincode}
            onChange={(event) => handleData(event, index, detail)}
          />
        </Grid>
      </Grid>
      <div className={classes.content}>
        <FormControlLabel
          control={
            <Checkbox
              checked={permanentAddressCheck}
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
