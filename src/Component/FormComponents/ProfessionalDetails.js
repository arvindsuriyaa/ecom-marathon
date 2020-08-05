/* eslint-disable array-callback-return */
import React, { useState, useEffect } from "react";
import { RadioGroup, Radio, FormControlLabel } from "@material-ui/core";
import Student from "./ProfessionComponents/Student";
import Professional from "./ProfessionComponents/Professional";
import HouseWives from "./ProfessionComponents/HouseWives";
import { bindDispatch } from "../../utils";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { professionStyle } from "../../styles/FormStyles";
import ModalBox from "../common/ModalBox";

const ProfessionalDetails = (props) => {
  const { actions, reducer } = props;
  const { professionToggle, studentDetails, professionalDetails } = reducer;
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

  const assignComponent = (event) => {
    const { isEdit } = reducer;
    let value = event.target.value;
    let isChecked = { ...professionToggle };
    let checkedArray = Object.entries(isChecked);
    checkedArray.map((item) => {
      return (item[1] = false);
    });
    setToggle(value);
    if (isEdit && !open) {
      setOpen(true);
      return;
    }
    isChecked = Object.fromEntries(checkedArray);
    if (value === "student") {
      let data = Object.entries(studentDetails);
      data.map((item) => {
        item[1] = "";
      });
      data = Object.fromEntries(data);
      isChecked.isStudent = event.target.checked;
      actions.assignData("studentDetails", data);

      actions.assignData("professionToggle", isChecked);
      setComponent(<Student />);
    } else if (value === "professional") {
      isChecked.isProfessional = event.target.checked;
      let data = Object.entries(professionalDetails);
      data.map((item) => {
        item[1] = "";
      });
      data = Object.fromEntries(data);
      actions.assignData("professionalDetails", data);
      actions.assignData("professionToggle", isChecked);
      setComponent(<Professional />);
    } else if (value === "houseWives") {
      isChecked.isHouseWive = event.target.checked;
      actions.assignData("professionToggle", isChecked);
      setComponent(<HouseWives />);
    }
  };

  const handleToggle = async (event) => {
    let isChecked = { ...professionToggle };
    let checkedArray = Object.entries(isChecked);
    checkedArray.map((item) => {
      return (item[1] = false);
    });
    isChecked = Object.fromEntries(checkedArray);
    if (toggle === "student") {
      isChecked.isStudent = true;
      let data = Object.entries(studentDetails);
      data.map((item) => {
        item[1] = "";
      });
      data = Object.fromEntries(data);
      actions.assignData("studentDetails", data);
      setComponent(<Student />);
    } else if (toggle === "professional") {
      isChecked.isProfessional = true;
      let data = Object.entries(professionalDetails);
      data.map((item) => {
        item[1] = "";
      });
      data = Object.fromEntries(data);
      actions.assignData("professionalDetails", data);
      setComponent(<Professional />);
    } else if (toggle === "houseWives") {
      isChecked.isHouseWive = true;
      setComponent(<HouseWives />);
    }
    await actions.assignData("professionToggle", isChecked);
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
            handleToggle={handleToggle}
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
