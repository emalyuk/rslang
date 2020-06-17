import { combineReducers } from "redux";
import { homeSliceReducer } from "../home/HomeSliceReducer";
import { loginSliceReducer } from "../auth/login/LoginSliceReducer";

export const rootReducer = combineReducers({
  home: homeSliceReducer,
  login: loginSliceReducer,
});

export default rootReducer;
