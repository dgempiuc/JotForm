import React from 'react'
import { Alert, Button, Text, Image, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { Actions } from 'react-native-router-flux'

class About extends React.Component{

	constructor(props){
		super(props);
		this.state = {  forms : [] };
		this.goToHome = this.goToHome.bind(this);
		this.goToWeb = this.goToWeb.bind(this);
		this.editForm = this.editForm.bind(this);
		this.deleteForm = this.deleteForm.bind(this);
		this.confirmDelete = this.confirmDelete.bind(this);
	}

   goToHome(formId){
      Actions.home({ text : formId });
   }

   componentWillMount(){
   		let api = 'https://api.jotform.com/user/forms?apiKey=b9eaa4b5b896ac8e32ac4d7b8a7eaa54';
   		fetch(api).then(function(response){
	      return response.json();
	    }).then(function(data){
	      let result = data.content;
	      this.setState({ forms  : result });
	    }.bind(this)).catch(function(error){
      		console.log("error while fetching fields:", error.message);
    	});
   }

   goToWeb(){
      Actions.webview();
   }

   editForm(formId){
   		let url = "https://www.jotform.com/build/"+formId+"?iak=b9eaa4b5b896ac8e32ac4d7b8a7eaa54";
   		Actions.webview({ text : url});
   }

   confirmDelete(formId){
   		let api = "https://api.jotform.com/form/"+formId+"?apiKey=b9eaa4b5b896ac8e32ac4d7b8a7eaa54"
   		fetch(api, {method: 'delete'})
   		.then(function(response){
	      return response.json();
	    })
	    .then(function(data){
	    	if(data.responseCode==200){
	       		Alert.alert("Success","Submission deleted successfully.");
	       		Actions.main();
	    	}
	       	else
	       		Alert.alert("Error","Error happened while delete operation.")
	    });
   }

   deleteForm(formId){

   		let choice;
		Alert.alert(
		  'Delete Info',
		  'Are you sure about deleting this form?',
		  [
		    {text: 'Cancel'},
		    {text: 'OK', onPress: () => this.confirmDelete(formId) },
		  ]
		)
   }

   beautyString(str){
   	let len = str.length;
   	let item;
   	if(len>=15)
   		return str.substring(0,15)+"...";
   	else
   		return str;
   }

	render(){
		if(this.state.forms.length!=0){
			return( 
				<ScrollView>
	               { 
	                  this.state.forms.map((item, index) => {
	                  	if(item.status!=="DELETED") 
	                     return (<TouchableOpacity key={index} style={styles.item} onPress={()=>this.goToHome(item.id)}>
						  <View>
						  <Text>Form Title : {this.beautyString(item.title)}</Text>
						  </View>
						  <View>
						  <Button
							  onPress={()=> this.editForm(item.id)}
							  title="Edit Form"
							  color="#ffbf00"
							  accessibilityLabel="Learn more about edit operation"
							/>
						  	<Button
							  onPress={()=> this.deleteForm(item.id)}
							  title="Delete"
							  color="#ff4000"
							  accessibilityLabel="Learn more about delete operation"
							/>
							</View>
						</TouchableOpacity>); 
	                  })
	               }
	            </ScrollView>
			);
		}else
			return <Image style={styles.main} source={{uri:'http://3.bp.blogspot.com/-TPagpYykEQA/UnJ3yz1ymII/AAAAAAAABEk/4yqujuQ1yAQ/s1600/Loading+(5).gif'}}></Image>; 
	}

}
export default About

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