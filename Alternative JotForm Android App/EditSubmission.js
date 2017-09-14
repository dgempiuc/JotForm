import React from 'react'
import { Alert, Button, Text, View, Image, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';

class EditSubmissions extends React.Component{

	// editAnswer : user-entered input value
	constructor(props){
		super(props);
		this.state = { editAnswer : '' };
		this.editSubmission = this.editSubmission.bind(this);
	}

	// post submission answer via api using POST method.
	editSubmission(){
		 // see below.
		 const index = this.props.index+1;
		 const label = this.props.sublabels;
		
	     var form = new FormData();
	     // what is this?
	     // if we wanna update submission answer, basically we post submission[index]
	     // but there are 2 part in a field such as name field(name,surname) or date field(day,month,year),
	     // then, we post submission[index][label]
	     let field = "";
	     if(label=="")
	     	field = "submission["+ index +"]";
	     else
	      	field = "submission["+ index +"]["+label+"]";

	     form.append(field, this.state.editAnswer);

	     fetch("https://api.jotform.com/submission/"+this.props.id+"?apiKey="+this.props.apiKey, {
	       method: 'POST',
	       body: form
	     }).then(function(response){
	     	return response.json();
	     }).then(function(data){
	     	Actions.forms({text : this.props.apiKey});
	     }.bind(this)).catch(function(error){
      		Alert.alert("Error","Error happened while editing submission answer:"+error.message);
    	 });

	}

	render(){
		let x = this.props.question;
	    return(
	      <Image
	          style={myStyle.main} 
	          source={{uri : 'https://www.jotform.com/resources/assets/icon/jotform-logomark-transparent-400x400.png'}}>
				<Text style={[myStyle.text, {textAlign : 'center'}]}>{x}</Text>
	          	<TextInput style={myStyle.input} placeholder={this.props.answer} onChangeText={ (text) => this.setState({ editAnswer : text}) } />	        			
	      		<Button style={myStyle.button} color="#000000" title="Edit" onPress={this.editSubmission}/>
	      </Image> 
	    );
  	}

}

const myStyle = StyleSheet.create({
  main : {
    flex : 1,
    resizeMode: 'cover',
    flexDirection: 'column',
    justifyContent: 'center',
    padding : 10
  },
  input : {
    height : 40,
    borderColor : 'gray',
    borderWidth : 1,
    padding : 10
  },
  text : {
    fontWeight : 'bold',
    padding : 10
  },
  button : {
    paddingTop : 10
  }
});

export default EditSubmissions;