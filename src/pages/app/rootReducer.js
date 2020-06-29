import { combineReducers } from 'redux';
import { loginSliceReducer } from 'pages/auth/login/LoginSliceReducer';
import { dictionarySliceReducer } from '../dictionary/DictionaryReducer';

export const rootReducer = combineReducers({
  login: loginSliceReducer,
  dictionary: dictionarySliceReducer,
});

export default rootReducer;
