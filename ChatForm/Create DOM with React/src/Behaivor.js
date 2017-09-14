import React from 'react';
import { thanktext } from './App';

var cssQuestion = {
  width: '50%',
  padding: '20px',
  backgroundColor : 'Beige ',
  borderRadius: '12px',
  fontWeight: 'bold'
};

var cssAnswer = {
  width: '50%',
  padding: '20px',
  backgroundColor : 'Bisque ',
  borderRadius: '12px',
  float : 'right'
};

var buttonHandling;
class BehaivorController{
	
	constructor(handling){
		buttonHandling = handling;
	}

	defaultBehaivor(item){
		this.showInputArea();
		return(<div>
					<li style={cssQuestion}>{item.text}</li>
					<br/>
			</div>);
	}

	headerBehaivor(item){
		this.hideInputArea();
		return(<div style={{padding: '20px',textAlign:'center'}}>
					<p><b>{item.text}</b></p>
					<button onClick={()=>{buttonHandling()}}>Continue</button>
			</div>);		
	}

	header(item){
		return(<div style={{padding: '20px',textAlign:'center'}}>
					<p><b>{item.text}</b></p>
			</div>);			
	}

	buttonBehaivor(item){
		this.hideInputArea();
		return(<li style={cssQuestion}>{item.text}
                <br/><br/>
                <button onClick={ (e) => {
                	buttonHandling();
                    var thnx = document.getElementsByClassName("messages")[0];
                    thnx.innerHTML = thanktext;
                }}>Complete Chat</button>
            </li>);
	}

	dropdownBehaivor(item){
		this.hideInputArea();
		var options = item.options.split("|");
		var ret = options.map( (i) => {
			return <option>{i}</option>
		}); 
		return(<li style={cssQuestion}>{item.text}
                <br/><br/>
                <select id="select">{ret}</select>
                &nbsp;&nbsp;
                <button onClick={()=>{buttonHandling()}}>Select</button>
           </li>);
	}

	datepickerBehaivor(item){
		this.hideInputArea();
		return(<li style={cssQuestion}>{item.text}
                <br/><br/>
                <input type="date" id="date" />
                &nbsp;&nbsp;
                <button onClick={()=>{buttonHandling()}}>Select</button>
           </li>);
	}

	timeBehaivor(item){
		this.hideInputArea();
		return(<li style={cssQuestion}>{item.text}
                <br/><br/>
                <input type="time" id="time" />
                &nbsp;&nbsp;
                <button onClick={()=>{buttonHandling()}}>Select</button>
           </li>);			
	}

	resultBehaivor(item){
		return(<div>
			    	<li style={cssQuestion}>{item.text}</li>
			        <li style={cssAnswer}
			        	onDoubleClick={ (e)=>{
			        		e.preventDefault();
			        		e.target.setAttribute("contenteditable", true);  
    						e.target.focus();  
			        	}}
			        	onBlur={ (e)=>{
			        		e.target.setAttribute("contenteditable", false);  
			        		console.log(e.target.innerText);
			        	}}
			        >{item.data}</li>
			        <br/><br/><br/>
			</div>);
	}

	hideInputArea(){
		document.getElementsByClassName("send_message")[0].style.visibility = "hidden";
       	document.getElementsByClassName("message_input_wrapper")[0].style.visibility = "hidden";
	}

	showInputArea(){
    	document.getElementsByClassName("send_message")[0].style.visibility = "visible";
    	document.getElementsByClassName("message_input_wrapper")[0].style.visibility = "visible";
	}

}

export default BehaivorController;