import EMPLOYEE_DETAILS from "../Types/types";
import {EDIT_DETAILS} from "../Types/types";

const initialState = {
  id: null,
  personalDetails: {
    userName: "",
    gender: "",
    dob: null,
    age: "",
    email: "",
    mobileNumber: "",
    motherTongue: "",
    languageTags: [],
    knowProduct: {
      isNews: false,
      isTv: false,
      isFacebook: false,
      isLinkedin: false,
      isFriend: false,
      isOthers: false,
    },
    other: "",
  },
  professionToggle: {
    isStudent: true,
    isProfessional: false,
    isHouseWive: false,
  },
  profession: "student",
  studentDetails: {
    qualification: "",
    institution: "",
    class: "",
    address: "",
    country: "",
    state: "",
    district: "",
    pincode: "",
  },
  professionalDetails: {
    salary: "",
    level: "",
  },
  addressDetails: {
    institutionAddress: "",
    country: "",
    state: "",
    district: "",
    pincode: "",
  },
  isCompleted: {
    0: false,
    1: false,
    2: false,
  },
  errors: {
    userName: false,
    email: false,
  },
  permanentAddressCheck: false,
  permanentAddress: {},
  userHistory: [],
  emailCheck:false,
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

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case EMPLOYEE_DETAILS:
      return { ...state, [action.payload.name]: action.payload.value };
    case EDIT_DETAILS:
      return { ...state, ...action.payload.value };
    default:
      return state;
  }
};
