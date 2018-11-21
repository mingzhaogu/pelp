import { combineReducers } from 'redux';

import SessionReducer from './session.reducer';
import ErrorsReducer from './errors.reducer';

const rootReducer = combineReducers({
  session: SessionReducer,
  errors: ErrorsReducer
});

export default rootReducer;