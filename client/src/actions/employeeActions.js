/**
 * THIS FILE IS FOR TESTING PURPOSES ONLY
 */

import * as actions from "./types";

export const getEmployees = () => {
  return {
    type: actions.GET_EMPLOYEES,
  };
};

export const deleteEmployee = (id) => {
  return {
    type: actions.DELETE_EMPLOYEE,
    payload: {
      id: id,
    },
  };
};

export const addEmploeyee = (employee) => {
  return {
    type: actions.ADD_EMPLOYEE,
    payload: {
      item: item,
    },
  };
};
