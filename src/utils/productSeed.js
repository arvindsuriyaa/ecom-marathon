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
export const marketingMedium = [
  ["TV Media", "isTv"],
  ["FaceBook", "isFacebook"],
  ["Linkedin", "isLinkedin"],
  ["By Friend", "isFriend"],
  ["Others", "isOthers"],
];
export const state = ["Tamil Nadu", "Kerala", "Andhra Pradesh"];
export const district = ["Chennai", "Kanchepuram", "Tiruvallur"];
export const graduateLevel = ["UG", "PG"];
export const salary = ["1-5 Lakh", "5-10 Lakh", "10-15 Lakh", "Above 15 Lakhs"];
export const level = ["Junior", "Senior", "Super Senior"];
export const defaultState = {
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
  profession: "",
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
  toggleIcon: {
    userNameSort: false,
    mailSort: false,
    mobileSort: false,
    addressSort: false,
    districtSort: false,
    stateSort: false,
    professionSort: false,
  },
};
