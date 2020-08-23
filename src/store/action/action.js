/* eslint-disable array-callback-return */
/* eslint-disable no-useless-escape */
import ASSIGN_DATA from "../types/types";
import { RESET_DATA } from "../types/types";

export const assignData = (name, value) => ({
  type: ASSIGN_DATA,
  payload: { name: name, value: value },
});

export const resetForm = (value) => ({
  type: RESET_DATA,
});

export const handleData = (event, index, detail, userInfo) => {
  return async (dispatch, getState) => {
    const { addressDetails, qualificationDetails } = getState().reducer;
    let name = event.target.name;
    let value;
    if (parseInt(event.target.value)) {
      value = Number(event.target.value);
    } else {
      value = event.target.value;
    }
    if (typeof value === "string" && value.replace(/\s/g, "").length <= 0) {
      value = "";
    }
    if (detail === "personalDetails") {
      userInfo[name] = value;
      dispatch(assignData("personalDetails", userInfo));
      await dispatch(stepperCheck(name, index, userInfo));
    } else if (detail === "addressDetails") {
      addressDetails[name] = value;
      userInfo[name] = value;
      dispatch(assignData("addressDetails", addressDetails));
      await dispatch(stepperCheck(name, index, userInfo));
    } else if (detail === "qualificationDetails") {
      qualificationDetails[name] = value;
      userInfo[name] = value;
      dispatch(assignData("qualificationDetails", qualificationDetails));
      await dispatch(stepperCheck(name, index, userInfo));
    }
  };
};

export const checkDuplication = (userList) => {
  return async (dispatch, getState) => {
    const { personalDetails, errors, isEdit } = getState().reducer;
    let duplicationCheck = false;
    duplicationCheck = userList.some(
      (item) => item.mailId === personalDetails.mailId && !isEdit
    );

    if (duplicationCheck) {
      errors.mailId = true;
      await dispatch(assignData("emailCheck", true));
    } else {
      await dispatch(assignData("emailCheck", false));
    }
    await dispatch(assignData("errors", { ...errors }));
  };
};

export const checkMandatoryField = () => {
  return (dispatch, getState) => {
    const { personalDetails, errors } = getState().reducer;
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!personalDetails.name) {
      errors.name = true;
    }
    if (!reg.test(personalDetails.mailId)) {
      errors.mailId = true;
    }
  };
};

export const handleCheckbox = (event, index, detail, value) => {
  return async (dispatch, getState) => {
    const { personalDetails, addressDetails } = getState().reducer;
    const { knownViaProducts } = personalDetails;
    if (detail === "personalDetails") {
      if (value === 6) {
        personalDetails["others"] = "";
      }
      if (knownViaProducts.includes(value)) {
        let filterProducts = knownViaProducts.filter((item) => item !== value);
        personalDetails["knownViaProducts"] = filterProducts;
      } else {
        personalDetails["knownViaProducts"].push(value);
      }
      dispatch(assignData("personalDetails", personalDetails));
      await dispatch(stepperCheck("checkbox", index, personalDetails));
    } else if (detail === "addressDetails") {
      let isChecked = event.target.checked;
      if (isChecked) {
        addressDetails.type = 2;
      } else {
        addressDetails.type = 1;
      }
      dispatch(assignData("addressDetails", addressDetails));
    }
  };
};

export const keyCheck = (data, stepperCheck, flag) => {
  data.map((detail) => {
    if (Array.isArray(detail[1])) {
      if (!detail[1].length) {
        stepperCheck += 1;
      } else if (detail[0] === "knownViaProducts" && detail[1].includes(6)) {
        flag = false;
      }
    } else if (detail[0] === "others") {
      if (!flag && !detail[1]) {
        stepperCheck += 1;
      }
      return stepperCheck;
    } else if (
      (detail[1] === null ||
        (typeof detail[1] === "string" && !detail[1].length)) &&
      flag
    ) {
      stepperCheck += 1;
    }
  });
  return stepperCheck;
};

export const checkField = (data) => {
  return () => {
    let stepperCheck = 0,
      flag = true;
    function dataCheck(data) {
      stepperCheck = 0;
      return (stepperCheck = keyCheck(data, stepperCheck, flag));
    }
    dataCheck(data);
    return stepperCheck;
  };
};

export const setDetail = (activeStep, formDetails, completed) => {
  return (dispatch, getState) => {
    let reducer = getState().reducer;
    if (activeStep === 0) {
      const { personalDetails } = reducer;
      formDetails = { ...personalDetails };
    } else if (activeStep === 1) {
      const { addressDetails } = reducer;
      formDetails = addressDetails;
    } else if (activeStep === 2) {
      const { qualificationDetails } = reducer;
      if (qualificationDetails.userRoleId === 1) {
        const { annumSal, levelId, ...formDetails } = qualificationDetails;
        return formDetails;
      } else if (qualificationDetails.userRoleId === 2) {
        const { annumSal, levelId } = qualificationDetails;
        formDetails = { annumSal, levelId };
      } else if (qualificationDetails.userRoleId === 3) {
        formDetails = {};
      }
    }
    return formDetails;
  };
};

export const stepperCheck = (name, index, detail) => {
  return async (dispatch, getState) => {
    const { isCompleted, errors } = getState().reducer;
    let newCompleted = { ...isCompleted };
    let data = Object.entries(detail);
    let emptyFieldCount = await dispatch(checkField(data));
    if (name === "name" || name === "mailId") {
      errors[name] = false;
      dispatch(assignData("errors", errors));
    }
    if (emptyFieldCount <= Object.keys(detail).length && emptyFieldCount > 0) {
      newCompleted[index] = false;
    }
    if (emptyFieldCount === 0) {
      newCompleted[index] = true;
    }
    dispatch(assignData("isCompleted", newCompleted));
  };
};
