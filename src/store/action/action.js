import EMPLOYEE_DETAILS from "../Types/types";
import { EDIT_DETAILS } from "../Types/types";
import _ from "lodash";

export const assignData = (name, value) => ({
  type: EMPLOYEE_DETAILS,
  payload: { name: name, value: value },
});

export const editData = (name, value) => ({
  type: EDIT_DETAILS,
  payload: { name: name, value: value },
});

export const handleData = (event, index, detail, userInfo) => {
  return async (dispatch, getState) => {
    const { addressDetails, qualificationDetails } = getState().reducer;
    let name = event.target.name;
    let value;
    if (
      name === "genderId" ||
      name === "motherTongueId" ||
      name === "preferredLanguageId" ||
      name === "knownViaProducts"
    ) {
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

export const errorValidation = (userList) => {
  return (dispatch, getState) => {
    const { personalDetails, errors, isEdit } = getState().reducer;
    let duplicationCheck = false;
    if (!personalDetails.name) {
      errors.name = true;
    }
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!reg.test(personalDetails.mailId)) {
      errors.mailId = true;
    }
    userList.map((item) => {
      if (item.mailId === personalDetails.mailId && !isEdit) {
        duplicationCheck = true;
      }
    });
    (async () => {
      if (duplicationCheck) {
        errors.mailId = true;
        await dispatch(assignData("emailCheck", true));
        return;
      } else {
        await dispatch(assignData("emailCheck", false));
      }
      await dispatch(assignData("errors", { ...errors }));
    })();
    return duplicationCheck;
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

export const checkEmptyField = (data, formDetails, validationCount) => {
  return () => {
    let stepperCheck = 0,
      sample,
      flag = true;
    function dataCheck(data) {
      stepperCheck = 0;
      data.map((item) => {
        function keyCheck(detail) {
          if (typeof detail[1] === "string") {
            if (!detail[1].length && flag) {
              stepperCheck += 1;
              return;
            }
          } else if (typeof detail[1] === "boolean") {
            if (!detail[1]) {
              stepperCheck += 1;
            }
            if (detail[0] === "isOthers") {
              flag = false;
              if (detail[1] && !formDetails["other"].length) {
                sample += 1;
              }
            }
            return;
          } else if (detail[1] === null) {
            stepperCheck += 1;
            return;
          } else if (typeof detail[1] === "number") {
            return;
          } else if (Array.isArray(item[1])) {
            if (!item[1].length) {
              stepperCheck += 1;
              flag = false;
              return;
            } else {
              if (item[1].includes(6)) {
                flag = true;
              } else {
                flag = false;
              }
            }
          } else if (!Array.isArray(item[1])) {
            if (item[0] === "dateOfBirth") {
              if (!item[1]) {
                return (stepperCheck += 1);
              }
              return;
            }
            sample = stepperCheck;
            dataCheck(Object.entries(item[1]));
            if (stepperCheck === Object.keys(item[1]).length) {
              stepperCheck = sample + 1;
            } else {
              stepperCheck = sample;
            }
          }
        }
        keyCheck(item);
      });
    }
    dataCheck(data);
    validationCount = stepperCheck;
    return validationCount;
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
        formDetails = {
          userQualificationId,
          studyingAt,
          stateId,
          pincode,
          institutionName,
          institutionAddress,
          districtId,
          country,
        };
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
    let validationCount = 0;
    let newCompleted = { ...isCompleted };
    let data = Object.entries(detail);
    let emptyFieldCount = await dispatch(
      checkEmptyField(data, detail, validationCount)
    );
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
