function conditionReducer(state=[],action){
	switch(action.type){
		case 'FETCH_CONDITION':
			state = action.payload;	
			return state;
		default:
			return state;
	}
}

export default conditionReducer;