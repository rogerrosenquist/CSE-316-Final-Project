import { combineReducers } from "redux";
import itemReducer from "./itemReducer"; // TESTING PURPOSES
import employeeReducer from "./employeeReducer"; // TESTING PURPOSES

export default combineReducers({
  item: itemReducer, // TESTING PURPOSES
  employee: employeeReducer, // TESTING PURPOSES
});
