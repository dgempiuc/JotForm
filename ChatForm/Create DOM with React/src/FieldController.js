import React, { Component } from 'react';
import { connect } from 'react-redux';
import BehaivorController from './Behaivor';

class FieldController extends Component {

	controller(){
		var bc = new BehaivorController(this.props.buttonHandling);
	    var all = this.props.hey.questions.present;
	    var items = all.map( (item,id) => {
	    	if(!item.show)
	    		return;
	    	if(item.hide)
	    		return;
	    	if(item.data==='Header')
	    		return bc.header(item);
	    	if(item.data!=='')
			    return bc.resultBehaivor(item);
			else{
				switch(item.type){
					case 'control_button':
						return bc.buttonBehaivor(item);
					case 'control_dropdown':
						return bc.dropdownBehaivor(item);
					case 'control_datetime':
						return bc.datepickerBehaivor(item);
					case 'control_time':
						return bc.timeBehaivor(item);
					case 'control_head':
						return bc.headerBehaivor(item);
					default:
						return bc.defaultBehaivor(item);
				}
			}
	    });
		return items;
	}

	render(){
		return <div>{this.controller()}</div>;
	}

}

// "connect" makes available store passed by Provider in children hierarchy.
export default connect(
  store => ({
    hey : store
  })
)(FieldController)