/* eslint-disable array-callback-return */
import React, { useState, useEffect } from "react";
import { RadioGroup, Radio, FormControlLabel } from "@material-ui/core";
import Student from "./professionComponents/Student";
import Professional from "./professionComponents/Professional";
import HouseWives from "./professionComponents/HouseWives";
import { bindDispatch } from "../../utils";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { professionStyle } from "../../styles/FormStyles";
import ModalBox from "../common/ModalBox";

const ProfessionalDetails = (props) => {
  const { actions, reducer, apiData } = props;
  const { qualificationDetails } = reducer;
  const { isEdit } = reducer;
  const {
    userRoleId,
    userQualificationId,
    institutionName,
    institutionAddress,
    country,
    studyingAt,
    stateId,
    districtId,
    pincode,
    levelId,
    annumSal,
  } = qualificationDetails;
  const [component, setComponent] = useState();
  const [toggle, setToggle] = useState("");
  const [open, setOpen] = useState(false);
  const professionalDetails = {
    userRoleId,
    userQualificationId,
    institutionName,
    institutionAddress,
    country,
    studyingAt,
    stateId,
    districtId,
    pincode,
    levelId,
    annumSal,
  };

  useEffect(() => {
    if (qualificationDetails.userRoleId === 1) {
      setComponent(<Student {...props} />);
    } else if (qualificationDetails.userRoleId === 2) {
      setComponent(<Professional {...props} />);
    } else if (qualificationDetails.userRoleId === 3) {
      setComponent(<HouseWives {...props} />);
    }
  }, [props]);

  const assignToggle = async (value) => {
    setToggle(value);
  };
  const clearField = async (record) => {
    let data = Object.entries(record);
    data.map((item) => {
      if (typeof item[1] === "string") {
        item[1] = "";
      } else if (typeof item[1] === "number" || typeof item[1] === "object") {
        item[1] = null;
      }
    });
    data = Object.fromEntries(data);
    return data;
  };

  const assignComponent = async (event) => {
    let value, data;
    value = Number(event.target.value);
    data = await clearField(professionalDetails);
    data.id = qualificationDetails.id;
    data.userId = qualificationDetails.userId;
    if (value) {
      data["userRoleId"] = value;
    } else {
      data["userRoleId"] = toggle;
    }

    if (isEdit && !open) {
      await assignToggle(value);
      setOpen(true);
      return;
    }
    await actions.assignData("qualificationDetails", { ...data });
    if (value === 1 || toggle === 1) {
      setComponent(<Student {...props} />);
    } else if (value === 2 || toggle === 2) {
      setComponent(<Professional {...props} />);
    } else if (value === 3 || toggle === 3) {
      setComponent(<HouseWives {...props} />);
    }
    setOpen(false);
  };

  const classes = professionStyle();
  return (
    <div className={classes.root}>
      <div className={classes.radioRoute}>
        <RadioGroup row className={classes.alignRadio}>
          {apiData.userRoles &&
            apiData.userRoles.map((role) => {
              return (
                <FormControlLabel
                  control={
                    <Radio
                      color="primary"
                      value={role.id}
                      checked={qualificationDetails.userRoleId === role.id}
                      onChange={(event) => assignComponent(event)}
                    />
                  }
                  label={role.name}
                />
              );
            })}
        </RadioGroup>
        {open ? (
          <ModalBox
            open={open}
            onClose={() => setOpen(false)}
            handleToggle={assignComponent}
          />
        ) : null}
      </div>
      {component}
    </div>
  );
};

const mapStateToProps = createSelector(
  (state) => state.reducer,
  (reducer) => ({ reducer })
);

export default connect(mapStateToProps, bindDispatch)(ProfessionalDetails);
