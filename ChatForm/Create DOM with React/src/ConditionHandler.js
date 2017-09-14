
function ConditionHandler(hide,items,conditions,counter){

	conditions.map( (condition) => {
		if(condition.from===(items[counter].qid-1)){
			if(condition.operator==='isFilled'){
				if(condition.visibility==='Show'){
					if(items[counter].data==='No answered'){
						let index = getItem(items,condition.to+1);
						return hide(index);
					}
				}else if(condition.visibility==='Hide'){
					if(items[counter].data!=='No answered'){
						let index = getItem(items,condition.to+1);
						return hide(index);
					}
				}
				
			}else if(condition.operator==='isEmpty'){
				if(condition.visibility==='Show'){
					if(items[counter].data!=='No answered'){
						let index = getItem(items,condition.to+1);
						return hide(index);						
					}
				}else if(condition.visibility==='Hide'){
					if(items[counter].data==='No answered'){
						let index = getItem(items,condition.to+1);
						return hide(index);
					}
				}				
			}
		}

	});

}

function getItem(items,id){
	var index;
	for(var i=0;i<items.length;i++){
		if(items[i].qid==id)
			index = i;
	}
	return index;
}

export default ConditionHandler;