import React from 'react'
import { Alert, Text, Image, View, StyleSheet, ScrollView, TouchableOpacity, Button } from 'react-native'
import { Actions } from 'react-native-router-flux'

class Submission extends React.Component{

	// fields    : submissions question names
	// texts     : submissions question texts
	// sublabels : submissions question sublabels
	// this states are calculated here, but used in "EditSubmission" layout.
	constructor(props){
		super(props);
		this.state = { fields :  [], texts : [], sublabels : [] };
	}

	render(){
		let results = this.props.text;
		let id = this.props.id;
		let apiKey =  this.props.apiKey;
		let tags = this.props.fields;
		let questionText = this.props.texts;
		let sublabels = this.props.sublabels;
		return(
				<ScrollView> 
					{Object.keys(results).map(function(key, index) {
    					let item = results[key];
    					if(item.text!==undefined && item.answer!==undefined){
    						let answer;
    						if(item.prettyFormat!==undefined)
    							answer = item.prettyFormat;
    						else
    							answer = item.answer;
    						return (<TouchableOpacity key={index} style={styles.item}>
						  				<Text>
						  				<Text style={{fontWeight : 'bold'}}> {item.text}</Text>
						  				<Text>{"\n\n"}</Text>
						  				<Text> {JSON.stringify(answer)}</Text>
										</Text> 
										<Button 
										  onPress={()=>Actions.editSubmission({ text : tags[index], id : id, question : questionText[index], index : index, sublabels : sublabels[index], answer : answer, apiKey : apiKey })}
										  title="Edit"
										  color="#841584"
										  accessibilityLabel="Learn more about edit operation"
										/>
									</TouchableOpacity>);
    					}
    				})}
	            </ScrollView> 
		);
	}

}
export default Submission;

const styles = StyleSheet.create ({
  main : {
    flex : 1,
    resizeMode: 'cover',
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
   }
})