/**
 * THIS FILE IS FOR TESTING PURPOSES ONLY
 */

import axios from "axios";
import * as actions from "./types";

export const getEmployees = () => (dispatch) => {
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

export const addEmployee = (employee) => {
  return {
    type: actions.ADD_EMPLOYEE,
    payload: {
      employee: employee,
    },
  };
};
