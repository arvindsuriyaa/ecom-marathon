import ASSIGN_DATA from "../types/types";
import { RESET_DATA } from "../types/types";

export const assignData = (name, value) => ({
  type: ASSIGN_DATA,
  payload: { name: name, value: value },
});

export const resetForm = (value) => ({
  type: RESET_DATA,
});
