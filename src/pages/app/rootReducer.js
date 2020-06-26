import { combineReducers } from 'redux';
import { homeSliceReducer } from 'pages/home/HomeSliceReducer';
import { loginSliceReducer } from 'pages/auth/login/LoginSliceReducer';

export const rootReducer = combineReducers({
  home: homeSliceReducer,
  login: loginSliceReducer,
});

export default rootReducer;
