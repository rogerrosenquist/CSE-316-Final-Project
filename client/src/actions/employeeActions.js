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

export const updateEmployee = (employee) => (dispatch) => {
  axios.put(`/api/employees/${employee._id}`, employee).then((res) => {
    dispatch({
      type: actions.UPDATE_EMPLOYEE,
      payload: {
        employee: employee,
      },
    });
  });
};

export const deleteEmployee = (id) => (dispatch) => {
  axios.delete(`/api/employees/${id}`).then((res) =>
    dispatch({
      type: actions.DELETE_EMPLOYEE,
      payload: {
        id: id,
      },
    })
  );
};

export const setEmployeesLoading = () => {
  return {
    type: actions.EMPLOYEES_LOADING,
  };
};
