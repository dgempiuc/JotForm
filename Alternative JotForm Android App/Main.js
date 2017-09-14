import React from 'react'
import { TextInput, Alert, AlertIOS, Button, Text, Image, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { Actions } from 'react-native-router-flux';

class Main extends React.Component{

	// visible : for form prompt
	// input   : holds new form's name
	constructor(props){
		super(props);
		this.formPrompt = this.formPrompt.bind(this);
		this.formCreator = this.formCreator.bind(this);
		this.state = { visible : false, input : '' };
	}

	// form prompt is a border that includes ui components about new form creation
	// if it is closed, then it will open when clicked, and vice versa.
	formPrompt(){
		if(this.state.visible)
			this.setState({ visible : false });
		else
			this.setState({ visible : true });
	}


	formCreator(input){
		if(input==""){
			Alert.alert("Error","Form name cannot be empty");
			return;
		}
		this.setState({ visible : false });
		let apiKey = this.props.text;
		// this api creates new empty form and return its id.
		// when we get this id after creation, then send it to webview.
		let newFormId; 
	    let api = "https://api.jotform.com/form/new?apiKey="+apiKey;
	    fetch(api)
	    .then(function(response){
	      return response.json();
	    }).then(function(data){
	      // get new form's id
	      newFormId = data.content.id;
	      // create url that edit option.
	      let url = "https://www.jotform.com/build/"+newFormId+"?iak="+this.props.text;
	      // parameters => data : user-entered title
	      let obj = { id : newFormId, data : input, text : url , scene : 'main', apiKey : apiKey};
	      // routing
	      Actions.webview(obj);
	    }.bind(this)).catch(function(error){
	      Alert.alert("Error","Error happened while creating new form.");
	    });
	}

	render(){
		let apiKey = this.props.text;
		return(
			<Image
	          style={styles.main} 
	          source={{uri : 'https://www.jotform.com/resources/assets/icon/jotform-logomark-transparent-400x400.png'}}>
				
				{ /*  when click this button, form prompt will be opened and closed */}
				<Button
					onPress={this.formPrompt}
					title="Create Form"
					color="#ffbf00"
					accessibilityLabel="Learn more about create operation"
				/>
				<Text></Text>
				{ /*  form prompt, only visible when you click "create form" button. */}
				{
				this.state.visible && 
				<View style={{borderWidth: 1}}>
					<Text style={[styles.text, {textAlign : 'center'}]}>Enter Form Name</Text>
	          		<TextInput style={styles.input} placeholder="Something" onChangeText={ (text) => this.setState({input : text}) } />	        			
	      			<Button style={styles.button} color="#000000" title="Create" onPress={()=>this.formCreator(this.state.input)}/>
				</View>
				}
				<Text></Text>
				{ /* routing */}
				<Button 
					style={{marginTop : 50}}
					onPress={()=> Actions.forms({text : apiKey})}
					title="View Forms"
					color="#ffbf00"
					accessibilityLabel="Learn more about view operation"
				/>
				</Image>
		);
	}

}
export default Main;

const styles = StyleSheet.create ({
  main : {
    flex : 1,
    flexDirection: 'column',
    justifyContent: 'center',
    padding : 10
  },
   item: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 30,
      margin: 2,
      borderColor: '#2a4944',
      borderWidth: 1,
      backgroundColor: '#d2f7f1'
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
})