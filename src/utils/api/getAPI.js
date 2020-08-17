import instance from "./apiAction";
import Axios from "axios";
import * as Root from "../RootDirectory";

export const getAllUsers = async () => {
  try {
    let response = await instance.get(Root.ALL_USER);
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

export const getAll = async () => {
  try {
    let response = await Axios.all([
      instance.get(Root.ADDRESS_TYPE),
      instance.get(Root.ANNUM_SALARY),
      instance.get(Root.KNOW_PRODUCT),
      instance.get(Root.GENDER),
      instance.get(Root.PROFESSIONAL_LEVEL),
      instance.get(Root.STATES),
      instance.get(Root.QUALIFICATION),
      instance.get(Root.USER_ROLE),
      instance.get(Root.LANGUAGE),
    ]);
    return response;
  } catch (error) {
    return error;
  }
};
