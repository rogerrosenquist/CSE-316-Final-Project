/**
 * THIS FILE IS FOR TESTING PURPOSES ONLY
 */

import * as actions from "../actions/types";

const initialState = {
  employees: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actions.GET_EMPLOYEES:
      return {
        ...state,
        employees: action.payload.employees,
        loading: false,
      };
    case actions.DELETE_EMPLOYEE:
      return {
        ...state,
        employees: state.employees.filter(
          (employee) => employee._id !== action.payload.id
        ),
      };
    case actions.ADD_EMPLOYEE:
      return {
        ...state,
        employees: [action.payload.employee, ...state.employees],
      };
    case actions.EMPLOYEES_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
