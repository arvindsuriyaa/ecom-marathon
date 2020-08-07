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
  const { actions, reducer } = props;
  const {
    professionToggle,
    studentDetails,
    professionalDetails,
    isEdit,
  } = reducer;
  const [component, setComponent] = useState();
  const [toggle, setToggle] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (professionToggle.isStudent) {
      setComponent(<Student />);
    } else if (professionToggle.isProfessional) {
      setComponent(<Professional />);
    } else if (professionToggle.isHouseWive) {
      setComponent(<HouseWives />);
    }
  }, []);

  const assignToggle = async (value) => {
    setToggle(value);
  };
  const clearField = async (record, isData, flag) => {
    let isChecked = { ...professionToggle };
    let checkedArray = Object.entries(isChecked);
    checkedArray.map((item) => {
      return (item[1] = false);
    });
    isChecked = Object.fromEntries(checkedArray);
    let data = Object.entries(record);
    data.map((item) => {
      item[1] = "";
    });
    data = Object.fromEntries(data);
    if (!isEdit) {
      isChecked[isData] = flag;
    } else {
      isChecked[isData] = true;
    }
    await actions.assignData("professionToggle", isChecked);
    return data;
  };

  const assignComponent = async (event) => {
    let value = event.target.value;
    let flag = event.target.checked;
    await assignToggle(value);
    if (isEdit && !open) {
      setOpen(true);
      return;
    }
    if (value === "student" || toggle === "student") {
      let data = clearField(studentDetails, "isStudent", flag);
      actions.assignData("studentDetails", data);
      setComponent(<Student />);
    } else if (value === "professional" || toggle === "professional") {
      let data = clearField(professionalDetails, "isProfessional", flag);
      actions.assignData("professionalDetails", data);
      setComponent(<Professional />);
    } else if (value === "houseWives" || toggle === "houseWives") {
      clearField({}, "isHouseWive", flag);
      setComponent(<HouseWives />);
    }
    setOpen(false);
  };

  const classes = professionStyle();
  return (
    <div className={classes.root}>
      <div className={classes.radioRoute}>
        <RadioGroup row className={classes.alignRadio}>
          <FormControlLabel
            value="student"
            control={
              <Radio
                color="primary"
                value="student"
                checked={professionToggle.isStudent}
                onChange={(event) => assignComponent(event)}
              />
            }
            label="Student"
          />
          <FormControlLabel
            value="professional"
            control={
              <Radio
                color="primary"
                value="professional"
                checked={professionToggle.isProfessional}
                onChange={(event) => assignComponent(event)}
              />
            }
            label="Professional"
          />
          <FormControlLabel
            value="houseWives"
            control={
              <Radio
                color="primary"
                value="houseWives"
                checked={professionToggle.isHouseWive}
                onChange={(event) => assignComponent(event)}
              />
            }
            label="HouseWives"
          />
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
