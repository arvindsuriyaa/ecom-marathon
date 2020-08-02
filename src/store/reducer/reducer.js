import EMPLOYEE_DETAILS from "../Types/types";

const initialState = {
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
  // selectAll: false,
  // checkBoxFlag: [],
  // cachedAddress: "",
  // isChecked: false,
  // index: null,
  // isEdit: false,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case EMPLOYEE_DETAILS:
      return { ...state, [action.payload.name]: action.payload.value };
    default:
      return state;
  }
};
