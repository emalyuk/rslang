import { combineReducers } from "redux";
import { homeSliceReducer } from "pages/home/HomeReducer";
import { loginSliceReducer } from "pages/auth/login/LoginSliceReducer";

export const rootReducer = combineReducers({
  home: homeSliceReducer,
  login: loginSliceReducer,
});

export default rootReducer;
