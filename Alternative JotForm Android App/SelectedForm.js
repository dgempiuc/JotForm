import React from 'react'
import { Alert, Button, Text, View, Image, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';

class SelectedForm extends React.Component{

	constructor(props){
		super(props);
		this.state = { submits : [], fields :  [], texts : [], sublabels : []};
		this.getAnswers = this.getAnswers.bind(this);
		this.validateAction = this.validateAction.bind(this);
		this.deleteAction = this.deleteAction.bind(this);
		this.readSubmission = this.readSubmission.bind(this);
	}

	// get all form's submissions by api.
   	componentDidMount(){
   		let formId = this.props.text;
   		let apiKey = this.props.apiKey;

   		// get all submits and assign them SUBMITS STATE
   		let api = "https://api.jotform.com/form/"+formId+"/submissions?apiKey="+apiKey;
   		fetch(api).then(function(response){
	      return response.json();
	    }).then(function(data){
	      let result = data.content;
	      this.setState({ submits  : result });
	    }.bind(this)).catch(function(error){
      	  Alert.alert("Error","Error happaned while fetching all submissions for a related form.", error.message);
    	});	    

		// this function actually is not related with this component, used in "EditSubmission" layout.
		// get a specific form's questions by api.
		// you dont spend power and time to understand here. its little complex.
		// see picture of this layout on github, then you will understand.
    	let questionNames = [], questionTexts = [], questionSublabels = [];
   		let api1 = "https://api.jotform.com/form/"+formId+"/questions?apiKey="+apiKey;
   		fetch(api1)
   		.then(function(response){
	    	return response.json();
	    })
	    .then(function(data){
	    	if(data.responseCode==200){
	    		var ret = data.content;
			    Object.keys(ret).map(function(key, index) {
			      var item = ret[key].name;
			      var item1 = ret[key].text;
			      var item2 = ret[key].sublabels;
			      questionNames.push(item);
			      questionTexts.push(item1);
			      if(item2!=undefined){
					const a = Object.keys(item2)[0];
			    	questionSublabels.push(a);
			      }else{
			      	questionSublabels.push("");
			      }
			    });
			    this.setState({ fields  : questionNames });
			    this.setState({ texts  : questionTexts });
			    this.setState({ sublabels : questionSublabels });
	    	}else
	       		Alert.alert("Error","Error happened while get operation.");
	    }.bind(this)).catch(function(error){
      		Alert.alert("Error","Error happened while fetching a form's questions.");
    	});
   }

   	// it is called when new submission's read button is clicked.
   	// it does not convert new to old submission. just display submissions/answers in Alert.
    getAnswers(results){
	   	let text = "";
	    Object.keys(results).map(function(key, index) {
	    	let item = results[key];
	    	let answer;
	    	if(item.prettyFormat!==undefined)
    			answer = item.prettyFormat;
    		else
    			answer = item.answer;
    		text += item.text.toUpperCase() + "\n"+JSON.stringify(answer)+ "\n";
	    	text += "-----------------\n";
	    });
	    if(text=="") 
	    	text =  "There is no valid submission.";
	   	Alert.alert("New Submission",text); 
   }

   // change new submission to old by api POST action.
   validateAction(id){
   		 let apiKey = this.props.apiKey;

	     var form = new FormData();
	     let field = "submission[new]";
	     form.append(field,"0");

	     fetch("https://api.jotform.com/submission/"+id+"?apiKey="+apiKey, {
	       method: 'POST',
	       body: form
	     }).then(function(response){
	     	return response.json();
	     }).then(function(data){
	     	;
	     }.bind(this)).catch(function(error){
      		Alert.alert("Error","Error happened while deleting new submission");
    	 });
   }

   // delete new submission by api.
   deleteAction(id){
   		let apiKey = this.props.apiKey;
   		let api = "https://api.jotform.com/submission/"+id+"?apiKey="+apiKey;
   		fetch(api, {method: 'delete'})
   		.then(function(response){
	    	return response.json();
	    })
	    .then(function(data){
	    	// if done successfully, routing FORMS LAYOUT
	    	if(data.responseCode==200){
	       		Alert.alert("Success","Submission deleted successfully.");
	    	}
	       	else
	       		Alert.alert("Error","Error happened while delete operation.")
	    });
   	}

   	// when old submission's READ button is clicked, then route SUBMISSION LAYOUT
   	readSubmission(results,formId){
   		let apiKey = this.props.apiKey;
	    Actions.submission({ text : results, fields : this.state.fields, id : formId, texts : this.state.texts, sublabels : this.state.sublabels, apiKey : apiKey });
   	}

	render(){
		if(this.state.submits.length!=0){
			return(
				<ScrollView>
	               {
	               	this.state.submits.map((item, index) => {
						if(item.new==="1"){ 
	                     return (<TouchableOpacity key={index} style={[styles.item,styles.newItem]}>
						  <Text style={{fontWeight: "bold"}}>NEW</Text>
						  <Button
							  onPress={()=>this.getAnswers(item.answers)}
							  title="Read"
							  color="#841584"
							  accessibilityLabel="Learn more about read operation"
							/>
						  <Button
							  onPress={()=>this.validateAction(item.id)}
							  title="Validate"
							  color="#841584"
							  accessibilityLabel="Learn more about validate operation"
							/>
							<Button
							  onPress={()=> this.deleteAction(item.id)}
							  title="Delete"
							  color="#841584"
							  accessibilityLabel="Learn more about delete operation"
							/>
						</TouchableOpacity>);
						}else if(item.new==="0" && item.answers!==undefined){
	                     return (<TouchableOpacity key={index} style={[styles.item,styles.oldItem]}>
						  <Text> OLD SUBMISSION</Text>
						  <Button
							  onPress={()=> this.readSubmission(item.answers,item.id)}
							  title="Read"
							  color="#841584"
							  accessibilityLabel="Learn more about read operation"
							/>
						</TouchableOpacity>);						
						}
	                  })
	               }
	            </ScrollView>
			);
		}else // loading icon during loading.
			return <Image style={styles.main} source={{uri:'http://3.bp.blogspot.com/-TPagpYykEQA/UnJ3yz1ymII/AAAAAAAABEk/4yqujuQ1yAQ/s1600/Loading+(5).gif'}}></Image>; 
	}

}

// NEW SUBMISSIONS have RED color
// OLD SUBMISSIONS have GREEN color.
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
   },
   newItem : {
   		backgroundColor: '#ff4000'
   },
   oldItem : {
   		backgroundColor : '#00ff00'
   }
})

export default SelectedForm;