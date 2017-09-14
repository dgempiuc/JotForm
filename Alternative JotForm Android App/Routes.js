import React from 'react'
import { Router, Scene, View, Image, Button } from 'react-native-router-flux'
import { Text } from 'react-native';
import Forms from './Forms'
import SelectedForm from './SelectedForm'
import Submission from './Submission'
import EditSubmission from './EditSubmission'
import MyWebView from './WebView'
import Main from './Main'
import Login from './Login'

class Routes extends React.Component{

	// all layouts at here
	// if you want to add more, just specifiy in <Scene/> tag.
	// quick explaination for them.
	/*  1- Login : login screen including username and password area. uses "POST /user/login" in API.
				   If the request handled successfully, then route the "Main" layout
		2 - Main : There are 2 fields named "Create Form" and "View Forms".
				   If click "Create Form", then route "Webview" Layout. Otherwise route "Forms" layout.
		3 - WebView: Webview displays a responsive web site content.
				   In this app, it is used 2 different part; "Create Form" and "Edit Form" choice.
		4 - Forms: List all ENABLED forms and provide 3 usage ;
				   - List form's submissions when clicked. It routes "SelectedForm" layout.
				   - "Edit Form" and "Delete Form" options. It routes "Webview" for edit operation.
		5 - SelectedForm: This shows all submissions for related form. Divide them by 2 like OLD and NEW SUBMISSION.
				   If it is new submission, then its color is red and provide 3 option for you. 
				   1) Read (no read actually,just show), 2) Validate (convert new to old submission) and 3) Delete this submission.
				   If it is old submission, then its color is green and provide edit submissions when clicked.
				   It routes "About" layout.
		6- Submission: Show questions for a related submission and you can edit this "Edit" Button.
				   It routes "EditSubmissions" layout.
		7- EditSubmissions: Edit a question for a related submission.
	*/
	render(){
		return(  
		   <Router sceneStyle={{ marginTop : 20}}>
		      <Scene key = "root">
		      	 <Scene key = "login" component = {Login} title = "Login" initial = {true} /> 
		      	 <Scene key = "main" component = {Main} title = "Home" /> 
		      	 <Scene key = "webview" component = {MyWebView} title = "Web" />
		      	 <Scene key = "forms" component = {Forms} title = "Forms" />
		         <Scene key = "selectedForm" component = {SelectedForm} title = "Form" />
		         <Scene key = "submission" component = {Submission} title = "Submission" />
		         <Scene key = "editSubmission" component = {EditSubmission} title = "Edit Submission" />
		       </Scene>
		   </Router> 
		);
	}
}
export default Routes;