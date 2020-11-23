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
    case actions.UPDATE_EMPLOYEE:
      return {
        ...state,
        employees: state.employees.map((employee) =>
          employee._id === action.payload.employee._id
            ? action.payload.employee
            : employee
        ),
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
