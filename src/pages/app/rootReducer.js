import { combineReducers } from 'redux';
import { loginSliceReducer } from 'pages/auth/login/LoginSliceReducer';

export const rootReducer = combineReducers({
  login: loginSliceReducer,
});

export default rootReducer;
