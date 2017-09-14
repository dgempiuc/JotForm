import React from 'react'
import { Alert, Button, Text, View, Image, TextInput, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';

class Login extends React.Component{

  constructor(props) {
    super(props);
    this.state = { usr : '', pwd : '' };
    this.onLoginPressed = this.onLoginPressed.bind(this);
  }

  async onLoginPressed() {
     if(this.state.usr==='' || this.state.pwd===''){
       Alert.alert("Error","Username and Password field cannot be empty.");
       return;
     }

     try {
       var form = new FormData();
       /*
       form.append('username', this.state.usr);
       form.append('password', this.state.pwd);
       */
       form.append('username', 'dgempiuc@gmail.com');
       form.append('password', 'dniz?2107');
       form.append('appName', 'myReactNativeProject');
       form.append('access', 'full');
       const response = await fetch('https://api.jotform.com/user/login', {
         method: 'POST',
         headers: {
           Accept: 'application/json'
         },
         body: form
       });
       const res = await response.json();
       if(res.responseCode == 200){
         var appKey=res.content.appKey;
         Actions.main({ text : appKey });
       }else{
        console.log(res);
         Alert.alert("Error","Error happened. Be sure that you have filled fields right.");
       }
     } catch (errors) {
       Alert.alert("Error","Error while request");
     }

  }

  render() {
    return(
      <Image
          style={myStyle.main}  
          source={{uri : 'https://www.jotform.com/resources/assets/icon/jotform-logomark-transparent-400x400.png'}}> 
          <Text style={[myStyle.text, {textAlign : 'center'}]}>Username</Text>
          <TextInput style={myStyle.input} onChangeText={ (text) => this.setState({ usr : text}) } />
          <Text style={[myStyle.text, {textAlign : 'center'}]}>Password</Text>
          <TextInput style={myStyle.input} onChangeText={ (text) => this.setState({ pwd : text}) } secureTextEntry={true} />
          <Text></Text>
          <Text></Text>
          <Button style={myStyle.button} color="#000000" title="Login" onPress={this.onLoginPressed}/>
      </Image> 
    );
  }

}

export default Login;

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
    padding : 10,
  },
  text : {
    fontWeight : 'bold',
    padding : 10
  },
  button : {
    paddingTop : 10
  }
});