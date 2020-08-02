import EMPLOYEE_DETAILS from "../Types/types";
import _ from "lodash";

export const assignData = (name, value) => ({
  type: EMPLOYEE_DETAILS,
  payload: { name: name, value: value },
});

export const collectInfo = (event) => {
  return (dispatch, getState) => {
    let { userDetails, errors } = getState().reducer;
    let name = event.target.name;
    let value = event.target.value;
    userDetails[name] = value;
    errors[name] = "";
    if (name === "firstName") {
      userDetails["name"] = value + " " + userDetails.lastName;
    } else if (name === "lastName") {
      userDetails["name"] = userDetails.firstName + " " + value;
    }
    dispatch(assignData("userDetails", { ...userDetails, [name]: value }));
    dispatch(assignData("errors", errors));
  };
};

export const handleData = (event, index, detail) => {
  return async (dispatch, getState) => {
    debugger;
    const {
      personalDetails,
      addressDetails,
      studentDetails,
      professionalDetails,
    } = getState().reducer;
    let name = event.target.name;
    let value = event.target.value;
    if (detail === "personalDetails") {
      personalDetails[name] = value;
      dispatch(assignData("personalDetails", personalDetails));
      await dispatch(stepperCheck(name, index, personalDetails));
    } else if (detail === "addressDetails") {
      addressDetails[name] = value;
      dispatch(assignData("addressDetails", addressDetails));
      await dispatch(stepperCheck(name, index, addressDetails));
    } else {
      if (detail === "student") {
        studentDetails[name] = value;
        dispatch(assignData("studentDetails", studentDetails));
        await dispatch(stepperCheck(name, index, studentDetails));
      } else if (detail === "professional") {
        professionalDetails[name] = value;
        dispatch(assignData("professionalDetails", professionalDetails));
        await dispatch(stepperCheck(name, index, professionalDetails));
      }
    }
  };
};
export const handleCheckbox = (event, index, detail) => {
  return async (dispatch, getState) => {
    debugger;
    const { personalDetails, addressDetails } = getState().reducer;
    const { knowProduct } = personalDetails;
    let name = event.target.name;
    let value = event.target.checked;
    if (detail === "personalDetails") {
      knowProduct[name] = value;
      if (name === "isOthers") {
        personalDetails["other"] = "";
      }
      personalDetails["knowProduct"] = { ...knowProduct };
      dispatch(assignData("personalDetails", personalDetails));
      await dispatch(stepperCheck(name, index, personalDetails));
    } else if (detail === "addressDetails") {
      let addressCopy;
      if (name === "permanentAddressCheck") {
        if (value) {
          addressCopy = _.cloneDeep(addressDetails);
        } else {
          addressCopy = {};
        }
      }
      dispatch(assignData("permanentAddressCheck", value));
      dispatch(assignData("permanentAddress", addressCopy));
      await dispatch(stepperCheck(name, index, addressDetails));
    }
  };
};

export const checkEmptyField = (data, formDetails, validationCount) => {
  return async () => {
    // debugger;
    let stepperCheck = 0,
      sample,
      flag = true;

    function dataCheck(data) {
      stepperCheck = 0;
      data.map((item) => {
        // debugger
        function keyCheck(detail) {
          // debugger
          if (typeof detail[1] === "string") {
            if (!detail[1].length) {
              if (flag) {
                stepperCheck += 1;
              }
              return;
            }
          } else if (typeof detail[1] === "boolean") {
            if (!detail[1]) {
              stepperCheck += 1;
            }
            if (detail[0] === "isOthers") {
              flag = false;
              if (detail[1]) {
                if (!formDetails["other"].length) {
                  sample += 1;
                }
              }
            }
            return;
          } else if (detail[1] === null) {
            stepperCheck += 1;
            return;
          } else if (Array.isArray(item[1])) {
            if (!item[1].length) {
              stepperCheck += 1;
              return;
            }
          } else if (!Array.isArray(item[1])) {
            if (item[0] === "dob") {
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
  return async (dispatch, getState) => {
    // debugger;
    let reducer = getState().reducer;
    let newCompleted = { ...completed };
    if (activeStep === 0) {
      const { personalDetails } = reducer;
      formDetails = { ...personalDetails };
    } else if (activeStep === 1) {
      const { addressDetails } = reducer;
      formDetails = addressDetails;
    } else if (activeStep === 2) {
      const { professionToggle } = reducer;
      if (professionToggle.isStudent) {
        const { studentDetails } = reducer;
        formDetails = studentDetails;
      } else if (professionToggle.isProfessional) {
        const { professionalDetails } = reducer;
        formDetails = professionalDetails;
      } else if (professionToggle.isHouseWive) {
        newCompleted[activeStep] = true;
      }
    }
    // dispatch(formDetails)
    return formDetails;
  };
};

export const stepperCheck = (name, index, detail) => {
  return async (dispatch, getState) => {
    debugger;
    const { isCompleted, personalDetails, errors } = getState().reducer;
    let validationCount = 0;
    let newCompleted = { ...isCompleted };
    let data = Object.entries(detail);
    let emptyFieldCount = await dispatch(
      checkEmptyField(data, detail, validationCount)
    );
    if (name === "userName" || name === "email") {
      errors[name] = false;
      dispatch(assignData("errors", errors));
    }
    if (emptyFieldCount <= Object.keys(detail).length && emptyFieldCount > 0) {
      newCompleted[index] = false;
    }
    if (emptyFieldCount === 0) {
      newCompleted[index] = true;
    }
    // reducer["isCompleted"] = newCompleted;
    dispatch(assignData("isCompleted", newCompleted));
  };
};
