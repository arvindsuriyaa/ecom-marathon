import instance from "./apiAction";

export const getAddress = async () => {
  try {
    let response = await instance.get("/addressType");
    return response;
  } catch (error) {
    return error;
  }
};
export const getAnnumSalary = async () => {
  try {
    let response = await instance.get("/annumSalary");
    return response;
  } catch (error) {
    return error;
  }
};
export const knowProduct = async () => {
  try {
    let response = await instance.get("/knownviaproducts");
    return response;
  } catch (error) {
    return error;
  }
};
export const getDistrict = async () => {
  try {
    let response = await instance.get("/districts/1");
    return response;
  } catch (error) {
    return error;
  }
};
export const getGender = async () => {
  try {
    let response = await instance.get("/gender");
    return response;
  } catch (error) {
    return error;
  }
};

export const getLevel = async () => {
  try {
    let response = await instance.get("/professionalLevel");
    return response;
  } catch (error) {
    return error;
  }
};

export const getQualification = async () => {
  try {
    let response = await instance.get("/qualification");
    return response;
  } catch (error) {
    return error;
  }
};
export const getStates = async () => {
  try {
    let response = await instance.get("/states");
    return response;
  } catch (error) {
    return error;
  }
};
export const getUserRole = async () => {
  try {
    let response = await instance.get("/userRoles");
    return response;
  } catch (error) {
    return error;
  }
};
export const getLanguage = async () => {
  try {
    let response = await instance.get("/languages");
    return response;
  } catch (error) {
    return error;
  }
};

export const getAllUsers = async () => {
  try {
    let response = await instance.get("/allUsers");
    return response;
  } catch (error) {
    return error;
  }
};

export const getUsersById = async (id) => {
  try {
    let response = await instance.get(`/getUsersById/${id}`);
    return response;
  } catch (error) {
    return error;
  }
};
