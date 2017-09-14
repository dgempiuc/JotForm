import { createStore, applyMiddleware, combineReducers } from 'redux';
import undoable from 'redux-undo';

//Actions describe the fact that something happened, but don't specify how the application's state changes in response.
//This is the job of reducers.

// there are 3 reducers;
// 1- fieldReducer has 3 actions :
// FETCH FIELDS of form
// SET_SHOW_PROPERTY_OF_STATE so, when you answer a question, then show text question.
// HIDE_STATE to handle conditions.
// 2- conditionReducer has 1 action to FETCH CONDITIONs of form.
// 3- counterReducer holds "counter" state. it is used to display questions respectively.
import fieldReducer from './fieldReducer';
import conditionReducer from './conditionReducer';
import counterReducer from './counterReducer';

// to combine multiple reducer
const reducers = combineReducers({
	questions : undoable(fieldReducer),
	conditions: undoable(conditionReducer),
	counter   : undoable(counterReducer)
});

// it is logger when the action is fired.
const logger = (store) => (next) => (action) => {
	console.log(action.type + " are fired.");
	next(action);
}

// redux middleware allows you to add new functionalities by keeping simplicity like above logger.
const middleware = applyMiddleware(logger);
const store = createStore(reducers, middleware);

export default store;