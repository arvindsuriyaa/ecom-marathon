import instance from "./apiAction";

export const deleteAPI = async (id) => {
  try {
    let response = await instance.delete(`/deleteUser/${id}`);
    return response;
  } catch (error) {
    return error;
  }
};
