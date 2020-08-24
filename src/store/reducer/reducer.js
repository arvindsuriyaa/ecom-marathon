import ASSIGN_DATA from "../types/types";
import { RESET_DATA } from "../types/types";
import _ from "lodash";

export const initialState = {
  personalDetails: {
    name: "",
    genderId: null,
    dateOfBirth: null,
    age: null,
    mailId: "",
    mobNo: "",
    motherTongueId: null,
    preferredLanguageId: [],
    knownViaProducts: [],
    others: "",
  },
  qualificationDetails: {
    userRoleId: 1,
    userQualificationId: null,
    institutionName: "",
    institutionAddress: "",
    country: "",
    studyingAt: "",
    stateId: null,
    districtId: null,
    pincode: null,
    levelId: null,
    annumSal: null,
  },
  addressDetails: {
    address: "",
    stateId: null,
    districtId: null,
    pincode: "",
    country: "",
    type: 1,
  },
  isCompleted: {
    0: false,
    1: false,
    2: false,
  },
  errors: {
    name: false,
    mailId: false,
  },
  emailCheck: false,
  toggleIcon: {
    userNameSort: false,
    mailSort: false,
    mobileSort: false,
    addressSort: false,
    districtSort: false,
    stateSort: false,
    professionSort: false,
  },
  isEdit: false,
};

export const reducer = (state = _.cloneDeep(initialState), action) => {
  switch (action.type) {
    case ASSIGN_DATA:
      return { ...state, [action.payload.name]: action.payload.value };
    case RESET_DATA:
      return { ...state, ..._.cloneDeep(initialState) };
    default:
      return state;
  }
};
