import { assignData } from "../store/action/action";
import _ from "lodash";

export const handleData = (event, index, detail, userInfo) => {
  return async (dispatch, getState) => {
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
    await dispatch(assignDetails(detail, userInfo, index, name, value));
  };
};

export const assignDetails = (detail, userInfo, index, name, value) => {
  return async (dispatch, getState) => {
    const { qualificationDetails, errors } = _.cloneDeep(getState().reducer);
    if (detail === "personalDetails") {
      userInfo[name] = value;
      if (name === "name" || name === "mailId") {
        errors[name] = false;
        dispatch(assignData("errors", errors));
      }
      await dispatch(assignData("personalDetails", { ...userInfo }));
    } else if (detail === "addressDetails") {
      userInfo[name] = value;
      await dispatch(assignData("addressDetails", { ...userInfo }));
    } else if (detail === "qualificationDetails") {
      userInfo[name] = value;
      dispatch(
        assignData("qualificationDetails", {
          ...qualificationDetails,
          ...userInfo,
        })
      );
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
    // eslint-disable-next-line no-useless-escape
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
      dispatch(assignData("personalDetails", { ...personalDetails }));
    } else if (detail === "addressDetails") {
      let isChecked = event.target.checked;
      if (isChecked) {
        addressDetails.type = 2;
      } else {
        addressDetails.type = 1;
      }
      dispatch(assignData("addressDetails", { ...addressDetails }));
    }
  };
};

export const keyCheck = (data, vacantFieldCount, flag) => {
  data.forEach((detail) => {
    if (Array.isArray(detail[1])) {
      if (!detail[1].length) {
        vacantFieldCount += 1;
      } else if (detail[0] === "knownViaProducts" && detail[1].includes(6)) {
        flag = false;
      }
    } else if (detail[0] === "others") {
      if (!flag && !detail[1]) {
        vacantFieldCount += 1;
      }
      return vacantFieldCount;
    } else if (
      (detail[1] === null ||
        (typeof detail[1] === "string" && !detail[1].length)) &&
      flag
    ) {
      vacantFieldCount += 1;
    }
  });
  return vacantFieldCount;
};

export const checkField = (data) => {
  return () => {
    let vacantFieldCount = 0,
      flag = true;
    function dataCheck(data) {
      vacantFieldCount = 0;
      return (vacantFieldCount = keyCheck(data, vacantFieldCount, flag));
    }
    dataCheck(data);
    return vacantFieldCount;
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

export const stepperCheck = (index, detail) => {
  return async (dispatch, getState) => {
    const { isCompleted } = getState().reducer;
    let newCompleted = { ...isCompleted };
    let data = Object.entries(detail);
    let emptyFieldCount = await dispatch(checkField(data));
    if (emptyFieldCount <= Object.keys(detail).length && emptyFieldCount > 0) {
      newCompleted[index] = false;
    }
    if (emptyFieldCount === 0) {
      newCompleted[index] = true;
    }
    dispatch(assignData("isCompleted", newCompleted));
  };
};
