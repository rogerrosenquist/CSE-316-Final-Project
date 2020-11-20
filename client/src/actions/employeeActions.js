/**
 * THIS FILE IS FOR TESTING PURPOSES ONLY
 */

import axios from "axios";
import * as actions from "./types";

export const getEmployees = () => (dispatch) => {
  dispatch(setEmployeesLoading());
  axios.get("/api/employees").then((res) =>
    dispatch({
      type: actions.GET_EMPLOYEES,
      payload: {
        employees: res.data,
      },
    })
  );
};

export const addEmployee = (employee) => (dispatch) => {
  axios.post("/api/employees", employee).then((res) =>
    dispatch({
      type: actions.ADD_EMPLOYEE,
      payload: {
        employee: res.data,
      },
    })
  );
};

export const deleteEmployee = (id) => {
  return {
    type: actions.DELETE_EMPLOYEE,
    payload: {
      id: id,
    },
  };
};

export const setEmployeesLoading = () => {
  return {
    type: actions.EMPLOYEES_LOADING,
  };
};
