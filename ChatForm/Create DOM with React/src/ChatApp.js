import React, { Component } from 'react';
import { connect } from 'react-redux';
import MessageHistory from './MessageHistory';
import sendButtonHandler from './buttonHandler';

class ChatApp extends Component {

	constructor(props){
		super(props);
		this.buttonHandler = this.buttonHandler.bind(this);
	}

	// called when "SEND" button is clicked
	buttonHandler(){
		var items = this.props.hey.questions.present;
		let conditions = this.props.hey.conditions.present;
		let counter = this.props.hey.counter.present;
		const action = this.props.action;
		const increment = this.props.increment;
		const hide = this.props.hideState;
		sendButtonHandler(items,conditions,counter,action,increment,hide);
	}

	// control whether a field have to be hidden
	hideHandler(){
		var items = this.props.hey.questions.present;
		let counter = this.props.hey.counter.present;
		const increment = this.props.increment;
		if(items[counter]!==undefined){
			if(items[counter].hide===1){
				this.props.action({id:counter,data:'hiding'});
				this.props.increment();
			}
		}		
	}

  	render(){
	 this.hideHandler();
	 // VIEW LAYER
	 return (
	   	<div>
	      <div className="chat_window">
	      	{/* title */}
		    <div className="top_menu">
		      <div className="title">Chat Form</div>
		    </div>
		    <div className="bottom_wrapper clearfix">
			    {/* message history */}
			    <MessageHistory
			    	buttonHandling={this.buttonHandler}
			    />
			    {/* input area */}
			    <div className="message_input_wrapper">
			       <input id="myMessage" className="message_input" placeholder="Type your answer here ..." />
			    </div>
			    {/* send button */}
			    <div className="send_message" onClick={this.buttonHandler}>
			       <div className="icon"></div>
			       <div className="text">Send</div>
			    </div>
	        </div>
		  </div>
		  <div id="warning" className="notice error"></div>
	    </div>
	 );
  	}

}

export default connect(
  store => ({
    hey : store
  })
)(ChatApp)