import { combineReducers } from 'redux';

import SessionErrorsReducer from './sessionErrors.reducer';

const errorsReducer = combineReducers({
    session: SessionErrorsReducer
});

export default errorsReducer;