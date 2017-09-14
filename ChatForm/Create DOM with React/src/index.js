// created by Deniz Gürer, 2017, all rights reserved for JotForm.

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';

// store is a kind of repo that holds state's value.
// for all states, there is a redux and every job is done here.
import store from './store/store';

// subscribe method is called every action dispatched.
// this method has been wroten for giving information on browser console.
store.subscribe( () => {
	console.log("----------------------");
	console.log(store.getState().questions.present);
	console.log(store.getState().conditions.present);
	console.log(store.getState().counter.present);
	console.log("----------------------");
});

// "Provider" allows the store to affect the entire application.
ReactDOM.render(
	<Provider store={store}>
		<App 
			fetchFields={ (args) =>
				store.dispatch({ type : 'FETCH_FIELD', payload : args })}
			setShowPropertyOfState={ (args) =>
				store.dispatch({ type : 'SET_SHOW_PROPERTY_OF_STATE', payload : args })}
			fetchConditions={ (args) =>
				store.dispatch({ type : 'FETCH_CONDITION', payload : args})}
			hideState={ (args) =>
				store.dispatch({ type : 'HIDE_STATE', payload : args })}
			incrementCounter={ () => store.dispatch({ type : 'INC' })}
		/>
	</Provider>,
	document.getElementById('root')
);