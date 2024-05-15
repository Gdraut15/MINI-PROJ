import { combineReducers } from "redux";
import facultyReducer from "./facultyReducer";
import studentReducer from "./studentReducer";
import errorReducerHelper from "./errorReducerHelper";
import errorReducer from "./errorReducer";

export default combineReducers({
  faculty: facultyReducer,
  student: studentReducer,
  error: errorReducer,
  errorHelper: errorReducerHelper,
});
