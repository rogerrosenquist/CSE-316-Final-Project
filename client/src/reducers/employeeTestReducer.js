/**
 * THIS FILE IS FOR TESTING PURPOSES ONLY
 */

import * as actions from "../actions/types";

const initialState = {
  employeeTests: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actions.GET_EMPLOYEE_TESTS:
      return {
        ...state,
        employeeTests: action.payload.employeeTests,
        loading: false,
      };
    case actions.DELETE_EMPLOYEE_TEST:
      return {
        ...state,
        employeeTests: state.employeeTests.filter(
          (employeeTest) => employeeTest._id !== action.payload.id
        ),
      };
    case actions.ADD_EMPLOYEE_TEST:
      return {
        ...state,
        employeeTests: [action.payload.employeeTest, ...state.employeeTests],
      };
    case actions.UPDATE_EMPLOYEE_TEST:
      return {
        ...state,
        employeeTests: state.employeeTests.map((employeeTest) =>
          employeeTest._id === action.payload.employeeTest._id
            ? action.payload.employeeTest
            : employeeTest
        ),
      };
    case actions.EMPLOYEE_TESTS_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
