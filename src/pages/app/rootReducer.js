import { combineReducers } from 'redux';
import { loginSliceReducer } from 'pages/auth/login/LoginSliceReducer';
import { registrationSliceReducer } from 'pages/auth/registration/RegistrationSliceReducer';
import { dictionarySliceReducer } from '../dictionary/DictionaryReducer';
import { savannaSliceReducer } from '../../games/savanna/SavannaReducer';

export const rootReducer = combineReducers({
  login: loginSliceReducer,
  dictionary: dictionarySliceReducer,
  savanna: savannaSliceReducer,
  registration: registrationSliceReducer,
});

export default rootReducer;
