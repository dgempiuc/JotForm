import React, { Component } from 'react';
import './App.css';

var file = require("./posts.txt");
var FuzzySearch = require('fuzzy-search');

let posts = [];

class App extends Component {

  // in : user-entered input value in search box
  constructor(props){
    super(props);
    this.state = { in:'', type : '' };
  }

  // this function is one of lifecycle hooks, and called before component is rendered.
  // basically, read a "posts.txt" and split, then assign them "posts" object.
  componentWillMount(){
    var rawFile = new XMLHttpRequest();
    // remember that "file" is imported in line 4 => var file = require("./posts.txt")
    rawFile.open("GET", file, false);
    var allText, lines, line;
    rawFile.onreadystatechange = () => {
      if (rawFile.readyState === 4) {
        if (rawFile.status === 200 || rawFile.status === 0) {
          allText = rawFile.responseText;
          // split line by line
          lines = allText.split('\r\n');
          for(line in lines){
            // if you look at "posts.txt", you can realize rule : text | view | reply | url
            // for example; What is a sub-user account?|9|1|https://www.jotform.com/answers/1246104-What-is-a-sub-user-account#1
            var item = lines[line].split("|");
            var obj = {};
            obj["text"] = item[0];
            obj["view"] = item[1];
            obj["reply"] = item[2];
            obj["url"] = item[3];
            posts.push(obj);
          }
        }
      }
    };
    rawFile.send(null);
  }

  // sort by view or reply
  sortBy(type){
    if(type==='View')
      return function(a, b) {
        // parseInt takes 2 arguments. The second one tells it which number base you want to use.
        // This is almost always going to be 10 (decimal).
        let i = parseInt(a.view,10);
        let j = parseInt(b.view,10);
        if (i > j)
          return -1;
        if (i < j)
          return 1;
        return 0;
      };
    else
      return function(a, b) {
        let i = parseInt(a.reply,10);
        let j = parseInt(b.reply,10);
        if (i > j)
          return -1;
        if (i < j)
          return 1;
        return 0;  
      };
  }

  render() {
    // in view layer, there are 5 main element.
    // 1- Current Input (show that user-entered input value)
    var current = this.state.in==='' ? "Nothing" : this.state.in;
    // 2- Found Topics (number of matching questions)
    const searcher = new FuzzySearch(posts,["text"]);
    let result = searcher.search(this.state.in);
    var found = this.state.in!=='' ? result.length : 0;
    // 3- Sort By View or Reply
    // 4- Search Box
    // 5- Hover Dropdown (list first **5** topic in matching questions)
    
    // if sorting type is specified, then sort.
    let sortType = this.state.type;
    if(sortType !== '')
      result.sort(this.sortBy(sortType));

    // filter results.
    var filterResult = result.map( (item,id)=>{
      // if current input is not empty, and item number is lower than 5,
      // then add dropdown-result. so, why 5 ? I have already mentioned above.
      // we want to list first 5 topic in matching questions.
      if(this.state.in!=='' && id<5)
        return <a key={id} href={item.url} target="_blank">{item.text}</a>;
      else
        return <span key={id} />;
    })

    // input variable is for lifting state up.
    // so, it is used for update input value inside search box.
    let input;
    return (
      // View Layer
      <div className="dropdown" style={{textAlign:"center"}}>
        { /* Current Input */ }
        <p>Current input : <b>{current}</b></p>
        { /* Found Topics */ }
        <p>Found Topics : <b>{found}</b></p>
        { /* Sort By View or Reply*/}
        <p> Sort By 
          <input type="radio" name="type" value="view"
          onClick={()=> this.setState({ type : 'View'})} /> View
          <input type="radio" name="type" value="reply" 
          onClick={()=> this.setState({ type : 'Reply'})} /> Reply
        </p>
        { /* Search Box */ }
        <input size="53" ref={ node => { input=node; } }
          onChange={(e)=> {
            // set input value state for each keystrokes. 
            this.setState({ in : input.value});
          }}
        ></input>
        { /* Hover Dropdown*/}
        <div className="dropdown-content">{filterResult}</div>
      </div> 
    );
  }
}

export default App;
