import React, { Component } from 'react';
import { connect } from 'react-redux';
import FieldController from './FieldController';

class MessageHistory extends Component {

	render(){
		let item = <FieldController buttonHandling={this.props.buttonHandling}/>;
		return <ul className="messages"> {item} </ul>
	}

}

export default connect(
  store => ({
    hey : store
  })
)(MessageHistory)