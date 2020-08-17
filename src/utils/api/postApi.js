import instance from "./apiAction";

export const postAPI = async (details) => {
  try {
    let response = await instance.post("/createUsers", details);
    return response;
  } catch (error) {
    return error;
  }
};
