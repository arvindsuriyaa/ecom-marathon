/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, { useState, useEffect } from "react";
import { RadioGroup, CircularProgress } from "@material-ui/core";
import Student from "./professionComponents/Student";
import Professional from "./professionComponents/Professional";
import HouseWives from "./professionComponents/HouseWives";
import { bindDispatch } from "../../../utils";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { professionStyle } from "../../../styles/FormStyles";
import ModalBox from "../../common/ModalBox";
import DialogBox from "../../common/DialogBox";
import * as fetchApi from "../../../api/apiAction";
import RadioButton from "../../common/RadioButton";

const ProfessionalDetails = (props) => {
  const { actions, reducer } = props;
  const { qualificationDetails } = reducer;
  const { isEdit } = reducer;
  const { id, userId, ...professionalDetails } = qualificationDetails;
  const [component, setComponent] = useState();
  const [toggle, setToggle] = useState("");
  const [open, setOpen] = useState(false);
  const [apiData, setApiData] = useState([]);
  const [status, setStatus] = useState(<CircularProgress size={70} />);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const newProps = { ...props, apiData };
    if (qualificationDetails.userRoleId === 1) {
      setComponent(<Student {...newProps} />);
    } else if (qualificationDetails.userRoleId === 2) {
      setComponent(<Professional {...newProps} />);
    } else if (qualificationDetails.userRoleId === 3) {
      setComponent(<HouseWives {...newProps} />);
    }
  }, [apiData]);

  async function fetchData() {
    const response = await fetchApi.qualificationAPI();
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
    if (isEdit) {
      data.id = qualificationDetails.id;
      data.userId = qualificationDetails.userId;
    }
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
    const newProps = { ...props, apiData };
    await actions.assignData("qualificationDetails", { ...data });
    if (value === 1 || toggle === 1) {
      setComponent(<Student {...newProps} />);
    } else if (value === 2 || toggle === 2) {
      setComponent(<Professional {...newProps} />);
    } else if (value === 3 || toggle === 3) {
      setComponent(<HouseWives {...newProps} />);
    }
    setOpen(false);
  };

  const classes = professionStyle();
  return !apiData.length ? (
    <div className={classes.progress}>{status}</div>
  ) : (
    <div className={classes.root}>
      <div className={classes.radioRoute}>
        <RadioGroup row className={classes.alignRadio}>
          {apiData[4] &&
            apiData[4].map((role) => {
              return (
                <RadioButton
                  value={role.id}
                  checked={qualificationDetails.userRoleId === role.id}
                  onChange={(event) => assignComponent(event)}
                  itemName={role.name}
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
