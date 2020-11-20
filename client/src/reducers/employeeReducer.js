/**
 * THIS FILE IS FOR TESTING PURPOSES ONLY
 */

import * as actions from "../actions/types";

const initialState = {
  employees: [
    {
      isLabWorker: true,
      _id: "5fb5bbd364d0638ab388c0b0",
      employeeID: 4,
      email: "cup@gmail.com",
      firstName: "Iron",
      lastName: "Cup",
      passcode: "hematite",
    },
    {
      isLabWorker: false,
      _id: "5fb5bbd364d0638ab388c0af",
      employeeID: 3,
      email: "chair@gmail.com",
      firstName: "Zinc",
      lastName: "Chair",
      passcode: "sphalerite",
    },
    {
      isLabWorker: false,
      _id: "5fb5bbd364d0638ab388c0ae",
      employeeID: 2,
      email: "table@gmail.com",
      firstName: "Lead",
      lastName: "Table",
      passcode: "galena",
    },
    {
      isLabWorker: false,
      _id: "5fb5bbd364d0638ab388c0ad",
      employeeID: 1,
      email: "door@gmail.com",
      firstName: "Copper",
      lastName: "Door",
      passcode: "chalcopyrite",
    },
  ],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actions.GET_EMPLOYEES:
      return {
        ...state,
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
    default:
      return state;
  }
}
