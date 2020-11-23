/**
 * THIS FILE IS FOR TESTING PURPOSES ONLY
 */

import axios from "axios";
import * as actions from "./types";

export const getEmployeeTests = () => (dispatch) => {
  dispatch(setEmployeeTestsLoading());
  axios.get("/api/employee-tests").then((res) =>
    dispatch({
      type: actions.GET_EMPLOYEE_TESTS,
      payload: {
        employeeTests: res.data,
      },
    })
  );
};

export const addEmployeeTest = (employeeTest) => (dispatch) => {
  axios.post("/api/employee-tests", employeeTest).then((res) =>
    dispatch({
      type: actions.ADD_EMPLOYEE_TEST,
      payload: {
        employeeTest: res.data,
      },
    })
  );
};

export const updateEmployeeTest = (employeeTest) => (dispatch) => {
  axios
    .put(`/api/employee-tests/${employeeTest._id}`, employeeTest)
    .then((res) => {
      dispatch({
        type: actions.UPDATE_EMPLOYEE_TEST,
        payload: {
          employeeTest: employeeTest,
        },
      });
    });
};

export const deleteEmployeeTest = (id) => (dispatch) => {
  axios.delete(`/api/employee-tests/${id}`).then((res) =>
    dispatch({
      type: actions.DELETE_EMPLOYEE_TEST,
      payload: {
        id: id,
      },
    })
  );
};

export const setEmployeeTestsLoading = () => {
  return {
    type: actions.EMPLOYEE_TESTS_LOADING,
  };
};
