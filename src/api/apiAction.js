import axios from "axios";
import * as path from "../constants/path";

export const instance = axios.create({
  baseURL: "http://localhost:4000",
  headers: {
    Accept: "application/json",
  },
  responseType: "application/json",
});
instance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
export default instance;

export const getAllUsers = async () => {
  try {
    let response = await instance.get(path.ALL_USER);
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

export const personalDetailsAPI = async () => {
  try {
    let response = await axios.all([
      instance.get(path.KNOW_PRODUCT),
      instance.get(path.GENDER),
      instance.get(path.LANGUAGE),
    ]);
    return response;
  } catch (error) {
    return error;
  }
};

export const addressDetailsAPI = async () => {
  try {
    let response = await axios.all([
      instance.get(path.ADDRESS_TYPE),
      instance.get(path.STATES),
    ]);
    return response;
  } catch (error) {
    return error;
  }
};

export const qualificationAPI = async () => {
  try {
    let response = await axios.all([
      instance.get(path.ANNUM_SALARY),
      instance.get(path.PROFESSIONAL_LEVEL),
      instance.get(path.STATES),
      instance.get(path.QUALIFICATION),
      instance.get(path.USER_ROLE),
    ]);
    return response;
  } catch (error) {
    return error;
  }
};

export const deleteAPI = async (id) => {
  try {
    let response = await instance.delete(`/deleteUser/${id}`);
    return response;
  } catch (error) {
    return error;
  }
};

export const postAPI = async (details) => {
  try {
    let response = await instance.post("/createUsers", details);
    return response;
  } catch (error) {
    return error;
  }
};

export const updateUser = async (id, userDetails) => {
  try {
    let response = await instance.put(`/updateUser/${id}`, userDetails);
    return response;
  } catch (error) {
    return error;
  }
};
