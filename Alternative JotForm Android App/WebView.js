import React, { Component } from 'react'

import { View, WebView, StyleSheet, Image, Alert }  from 'react-native'

class MyWebView extends React.Component{

  constructor(props){
    super(props);
  }

  // this method is useful for only PREVIOUS SCENE IS MAIN.
  // because, when we create new form, we will change form's title HERE.
  componentWillMount(){
    let previous = this.props.scene;
    let title = this.props.data;
    let id = this.props.id;
    let apiKey = this.props.apiKey;

    if(previous!='main')
      return;

    // should not spend your time and power to understand.
    // just changing form title by api
    var form = new FormData();
    form.append("properties[title]",title);
    fetch("https://api.jotform.com/form/"+id+"/properties?apiKey="+apiKey, {
         method: 'POST',
         body: form
     }).then(function(response){
        return response.json();
     }).then(function(data){
        ;
     }.bind(this)).catch(function(error){
        Alert.alert("Error","Error happened while changing form title.");
     });

  }

   render(){
      // display web site content 
      return (
         <View style = {styles.container}>
            <WebView              
               source = {{ uri: this.props.text }}
               renderLoading={function(){
                  return (<Image style={{
                      flex : 1,
                      resizeMode: 'cover',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      padding : 10
                    }} source={{uri:'http://3.bp.blogspot.com/-TPagpYykEQA/UnJ3yz1ymII/AAAAAAAABEk/4yqujuQ1yAQ/s1600/Loading+(5).gif'}}></Image>);
               }} 
               startInLoadingState
            />
         </View>);
   }
}
export default MyWebView;

const styles = StyleSheet.create({
   container: {
      flex : 1
   }
})