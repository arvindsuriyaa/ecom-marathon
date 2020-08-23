/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import InputField from "../../common/InputField";
import { bindDispatch } from "../../../utils";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { communicationStyle } from "../../../styles/FormStyles";
import * as fetchApi from "../../../api/apiAction";
import SelectField from "../../common/SelectField";
import DialogBox from "../../common/DialogBox";
import CheckBoxField from "../../common/CheckBoxField";

const AddressDetails = (props) => {
  const classes = communicationStyle();
  const { reducer, actions } = props;
  const { handleData, handleCheckbox, stepperCheck } = actions;
  const { addressDetails } = reducer;
  const { address, stateId, districtId, pincode, country } = addressDetails;
  const [district, setDistrict] = useState([]);
  const [apiData, setApiData] = useState([]);
  const [status, setStatus] = useState(<CircularProgress size={70} />);
  let userInfo = { address, stateId, districtId, pincode, country };
  let index = 1;
  let detail = "addressDetails";

  useEffect(() => {
    fetchData();
    assignDistrict(addressDetails.stateId);
    stepperCheck("addressDetails", index, userInfo);
  }, []);

  async function fetchData() {
    const response = await fetchApi.addressDetailsAPI();
    if (Array.isArray(response)) {
      let Data = [];
      response.map((item) => {
        Data.push(item.data);
      });
      setApiData(Data);
    } else {
      setStatus(<DialogBox />);
    }
  }

  const assignDistrict = async (id) => {
    if (id) {
      let districtCollection = await fetchApi.instance.get(`/districts/${id}`);
      setDistrict(districtCollection.data);
    } else {
      setDistrict([]);
    }
  };

  return !apiData.length ? (
    <div className={classes.progress}>{status}</div>
  ) : (
    <div className={classes.addressRoot}>
      <div className={classes.title}>Communication Address</div>
      <Grid className={classes.grid} container spacing={3}>
        <InputField
          sm={12}
          type="text"
          label="Address"
          name="address"
          value={addressDetails.address}
          onChange={(event) => handleData(event, index, detail, userInfo)}
        />
        <InputField
          sm={6}
          type="text"
          label="Country"
          name="country"
          value={addressDetails.country}
          onChange={(event) => handleData(event, index, detail, userInfo)}
        />
        <SelectField
          sm={6}
          labelName="State"
          className={props.className}
          name="stateId"
          value={addressDetails.stateId}
          onChange={async (event) => {
            handleData(event, index, detail, userInfo);
            addressDetails["districtId"] = null;
            actions.assignData("addressDetails", addressDetails);
            await assignDistrict(addressDetails.stateId);
          }}
          data={apiData[1]}
        />
        <SelectField
          sm={6}
          className={classes.formControl}
          labelName="District"
          name="districtId"
          value={addressDetails.districtId}
          onChange={(event) => {
            handleData(event, index, detail, userInfo);
          }}
          data={district}
          disabled={addressDetails.stateId === null}
        />
        <InputField
          sm={6}
          type="number"
          label="Pincode"
          name="pincode"
          value={addressDetails.pincode}
          onChange={(event) => handleData(event, index, detail, userInfo)}
        />
      </Grid>
      <div className={classes.content}>
        <CheckBoxField
          label="Permanent Address is same as Communication address"
          sm={12}
          checked={addressDetails.type === 2}
          name="permanentAddressCheck"
          onChange={(event) => handleCheckbox(event, index, detail)}
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
