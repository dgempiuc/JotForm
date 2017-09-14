import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChatApp from './ChatApp.js';

let url = window.location.search.split("?")[1].split("&");
var formId = url[0].split("=")[1];
var apiKey = url[1].split("=")[1];

const questionApi = "https://api.jotform.com/form/"+ formId +"/questions?apiKey="+apiKey;
const conditionApi = "https://api.jotform.com/form/"+ formId +"/properties?apiKey="+apiKey;

let results;
export let thankurl, thanktext;

class App extends Component {

  // fetch all "questions" and "conditions" of form before the component is rendered.
  componentDidMount(){
    document.getElementsByClassName("notice error")[0].style.visibility = "hidden";
    
    // questions?
    fetch(questionApi).then(function(response){
      return response.json();
    }).then(function(data){
      results = data.content;
      // returned values is not proper for using.
      // so, create more orderly object by assignToField
      this.assignToField(results);
    }.bind(this)).catch(function(error){
      console.log("error while fetching fields in App.js:", error.message);
    });
    // properties?
    fetch(conditionApi).then(function(response){
      return response.json();
    }).then(function(data){
      // get this values.
      // these are used to display form's thanks page when the form is submitted.
      thankurl = data.content.thankurl;
      thanktext = data.content.thanktext;
      // returned values is not proper for using.
      // so, create more orderly object by assignToField
      results = data.content.conditions;
      this.assignToCondition(results);
    }.bind(this)).catch(function(error){
      console.log("error while fetching conditions in App.js:", error.message);
    });
  }

  // sort function. used in assignToField function, check it.
  reOrder(a,b){
    if (a.order < b.order)
      return -1;
    if (a.order > b.order)
      return 1;
    return 0;    
  }

  // returned values is not proper for using, so create more orderly object by assignToField
  assignToField(results){
    // "myArr" holds all fields.
    let myArr = [];
    Object.keys(results).map(function(key, index) {
      // get object in order.
      var item = results[key];
      // create new object and assign and add new properties.
      var data = {};
      // get item(fields)'s properties and assign them to new created object.
      // for example, data, required, sublabels, suffix, text, type etc.
      Object.keys(item).map(function(key1,index1){
        return data[key1] = item[key1];
      });
      // add new properties.
      // show : 0 or 1. if 0, not show question. at the beginnig, all field's show property will be 0 except first question.
      data.show = 0;
      // data : answer for questions. when you enter your question and click it "Send", then this value will change.
      data.data = '';
      // hide : 0 or 1. it is used to handle conditions. for example, there is a hide/show condition and a field should be hidden.
      // then, set it to 1. Although the show feature is 1, this question will not be shown.
      data.hide = 0;
      // add this field/question to array.
      return myArr.push(data);
    });
    // fields re-order by order property. why is it neccessary?
    // if you add a field and you add another field on top of the first added field.
    // if you change their location, final situation like this;
    // (qid:1,order:2) and (qid:2,order:1). so first added field will be shown firt. 
    // but, we change their locations? so, sort them by "order" property.
    myArr.sort(this.reOrder);
    // first question's show property is 1 to be able to seen at the begining.
    myArr.map((i,index)=>{ if(index===0) i.show=1; return 0; } );
    // dispatch "fetch field"(in fieldReducer.js) action to update state.
    this.props.fetchFields(myArr);   
  }

  assignToCondition(results){
    // "myArr" holds all conditions.
    let myArr = [];
    Object.keys(results).map(function(key, index) {
      // which properties we need?
      // from : who will trigger?
      // to : who will be affected?
      // operator : conditions type like show/hide.
      var data = {
        from : JSON.parse(results[key].terms)[0].field - 1,
        to : JSON.parse(results[key].action)[0].field - 1,
        operator : JSON.parse(results[key].terms)[0].operator,
        visibility : JSON.parse(results[key].action)[0].visibility
        };
      return myArr.push(data);
    });
    // dispatch "fetch conditions"(in conditionReducer.js) action to update state.
    this.props.fetchConditions(myArr);
  }

  render() {
    return (
      <div>
        <ChatApp
          action={this.props.setShowPropertyOfState}
          hideState={this.props.hideState}
          increment={this.props.incrementCounter}
        />
      </div>
    );
  }
} 

// "connect" makes available store passed by Provider in children hierarchy.
export default connect(
  store => ({
    hey : store
  })
)(App)