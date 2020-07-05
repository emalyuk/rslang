import { combineReducers } from 'redux';
import { loginSliceReducer } from 'pages/auth/login/LoginSliceReducer';
import { cardsSliceReducer } from 'pages/cards/CardsSliceReducer';
import { dictionarySliceReducer } from '../dictionary/DictionaryReducer';
import { savannaSliceReducer } from "../../games/savanna/SavannaReducer";

export const rootReducer = combineReducers({
  cards: cardsSliceReducer,
  login: loginSliceReducer,
  dictionary: dictionarySliceReducer,
  savanna: savannaSliceReducer,
});

export default rootReducer;
