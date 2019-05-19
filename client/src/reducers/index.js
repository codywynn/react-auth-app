import { combineReducers } from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";

// Define root reducer
export default combineReducers({
  auth: authReducer,
  errors: errorReducer
});