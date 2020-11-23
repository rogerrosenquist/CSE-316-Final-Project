import { combineReducers } from "redux";
import itemReducer from "./itemReducer"; // TESTING PURPOSES
import employeeReducer from "./employeeReducer";
import employeeTestReducer from "./employeeTestReducer";
import poolMapReducer from "./poolMapReducer";
// import poolReducer from "./poolReducer";
// import wellTestingReducer from "./wellTestingReducer";
// import wellReducer from "./wellReducer";

export default combineReducers({
  item: itemReducer, // TESTING PURPOSES
  employee: employeeReducer,
  employeeTest: employeeTestReducer,
  poolMap: poolMapReducer,
  // pool: poolReducer,
  // wellTesting: wellTestingReducer,
  // well: wellReducer,
});
