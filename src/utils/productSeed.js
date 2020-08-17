export const navigationList = [
  "Personal Details",
  "Address Details",
  "Professional Details",
];
export const routePath = [
  "/Form/PersonalDetails",
  "/Form/AddressDetails",
  "/Form/ProfessionalDetails",
];

export const defaultState = {
  personalDetails: {
    name: "",
    genderId: null,
    dateOfBirth: null,
    age: "",
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
  userHistory: [],
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
