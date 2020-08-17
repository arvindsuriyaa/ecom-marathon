import instance from "./apiAction";

export const updateUser = async (id, userDetails) => {
  try {
    let response = await instance.put(`/updateUser/${id}`, userDetails);
    return response;
  } catch (error) {
    return error;
  }
};
