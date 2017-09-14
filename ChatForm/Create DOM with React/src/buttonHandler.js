import ConditionHandler from './ConditionHandler';

// it gives the warning message to user.
// for example, if the user enters empty input for required field, then give him a specific warning(message variable)
function infoMessage(message){
  var info = document.getElementsByClassName("notice error")[0];
  info.style.visibility = "visible";
  info.innerHTML = message ;
  setTimeout(function(){
    info.innerHTML = "" ;
    info.style.visibility = "hidden";
  }, 2000);
}

function sendButtonHandler(items,conditions,counter,action,increment,hide){

    // get user-entered input
  	var inputArea = document.getElementById("myMessage");
  	let input = inputArea.value;
  	// field properties
  	const fieldType = items[counter].type;
  	const required = items[counter].required;
    const hideState = items[counter].hide;

    // EMPTY INPUT CONTROL FOR REQUIRED FIELDS
    if(required==='Yes'){
      if(fieldType==="control_time" && document.getElementById("time").value===''){
        infoMessage("This field is required ...");
        return;
      }
      else if(fieldType==="control_datetime" && document.getElementById("date").value===''){
        infoMessage("This field is required ...");
        return;
      }      
    }
    // IF THE FIELD IS SUBMIT BUTTON, THEN TAKE ALL QUESTION'S ANSWER AND SUBMIT THEM BY API.
    if(fieldType==="control_button"){
      let mydata = {};
      items.map( (item,id)=> {
        if(id!==(items.length-1)){
          var obj = {};
          if(item.data==='hiding')
            obj['text'] = "No answered";
          else
            obj['text'] = item.data;
          mydata[item.qid] = obj;
        }
      });
      // data which will be submitted
      var data = new FormData();
      data = "["+JSON.stringify(mydata)+"]";
      // create api url
      let url = window.location.search.split("?")[1].split("&");
      var formId = url[0].split("=")[1];
      var apiKey = url[1].split("=")[1];
      let api = "https://api.jotform.com/form/"+formId+"/submissions?apiKey="+apiKey;
      fetch(api,{method: "PUT",body: data})
      .then(function(res){ return res.json(); })
      .then(function(data){ console.log(data); })
    }else if(fieldType==="control_email"){
        var regExp = /\S+@\S+\.\S+/;
        if(input==='' && required==='Yes'){
            inputArea.value = '';
            infoMessage("This field is required ...");
        }
        else if(input!=='' && !regExp.test(input)){
            inputArea.value = '';
            infoMessage("Please enter valid mail adress ...");
        }else{
            let data;
            if(input==="")
              data = "No answered";
            else
              data = input;
            let payload = { id : counter, data : data};
        	  action(payload);
            ConditionHandler(hide,items,conditions,counter);
            inputArea.value = '';
            increment();    
        }
    }
    else if(fieldType==="control_dropdown"){
		    var e = document.getElementById("select");
        let data = e.options[e.selectedIndex].text;
        var payload = { id : counter, data : data};
        action(payload);
        ConditionHandler(hide,items,conditions,counter);
        increment(); 
        showInputArea();
    }
    else if(fieldType==="control_datetime"){
        var e = document.getElementById("date");
        let data = e.value;
        if(data==="")
          data = "No answered";
        var payload = { id : counter, data : data};
        action(payload);
        ConditionHandler(hide,items,conditions,counter);
        increment(); 
        showInputArea();
    }
    else if(fieldType==="control_time"){
        var e = document.getElementById("time");
        let data = e.value;
        if(data==="")
          data = "No answered";
        var payload = { id : counter, data : data};
        action(payload);
        ConditionHandler(hide,items,conditions,counter);
        increment();
        showInputArea();
    }
    else if(fieldType==="control_phone"){
        var regExp = /\d{3}-?\d{2}-?\d{4}/;
        if(input==='' && required==='Yes'){
            inputArea.value = '';
            infoMessage("This field is required ...");
        }
        else if(input!=='' && !regExp.test(input)){
            inputArea.value = '';
            infoMessage("Please enter valid number in format 555-55-5555 ...");
        }else{
            let data;
            if(input==="")
              data = "No answered";
            else
              data = input;
            let payload = { id : counter, data : data};
            action(payload);
            ConditionHandler(hide,items,conditions,counter);
            inputArea.value = '';
            increment();    
        }
    }
    else if(fieldType==='control_head'){
            let payload = { id : counter, data : "Header"};
            action(payload);
            increment();
    }
    else{
        let data;
        if(input==="")
          data = "No answered";
        else
          data = input;
    	  let payload = { id : counter, data : data};
        action(payload);
        ConditionHandler(hide,items,conditions,counter);
        increment();  
        inputArea.value = '';    
    }

}

function showInputArea(){
    document.getElementsByClassName("send_message")[0].style.visibility = "visible";
    document.getElementsByClassName("message_input_wrapper")[0].style.visibility = "visible";
}

export default sendButtonHandler;