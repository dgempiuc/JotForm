// ACTIONS
// -FETCH FIELDS of form
// -SET_SHOW_PROPERTY_OF_STATE so, when you answer a question, then show text question.
// -HIDE_STATE to handle conditions.
function fieldReducer(state=[],action){
	switch(action.type){
		case 'FETCH_FIELD':
			state = action.payload;
			return state;
		case 'SET_SHOW_PROPERTY_OF_STATE':
			let current = state[action.payload.id];
			let next = state[action.payload.id+1];
			if(next != null){
				next.show = 1;
			}
			current.data = action.payload.data;
			return [...state];
		case 'HIDE_STATE':
			console.log(state);
			console.log(state[action.payload]);
			let item = state[action.payload];
			item.hide = 1;
			return [...state];
		default:
			return state;
	}
}

export default fieldReducer;