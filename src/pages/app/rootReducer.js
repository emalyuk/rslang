import { combineReducers } from 'redux';
import { loginSliceReducer } from 'pages/auth/login/LoginSliceReducer';
import { registrationSliceReducer } from 'pages/auth/registration/RegistrationSliceReducer';
import { cardsSliceReducer } from 'pages/cards/CardsSliceReducer';
import { dictionarySliceReducer } from '../dictionary/DictionaryReducer';
import { savannaSliceReducer } from '../../games/savanna/SavannaReducer';
import { englishPuzzleReducer } from '../../games/englishPuzzle/EnglishPuzzleReducer';

export const rootReducer = combineReducers({
  cards: cardsSliceReducer,
  login: loginSliceReducer,
  dictionary: dictionarySliceReducer,
  savanna: savannaSliceReducer,
  registration: registrationSliceReducer,
  englishPuzzle: englishPuzzleReducer,
});

export default rootReducer;
