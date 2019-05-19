import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";

// Define root reducer
export default combineReducers({
  auth: authReducer,
  errors: errorReducer
});