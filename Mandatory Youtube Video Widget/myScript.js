// created by Deniz Gurer, 2017 all rights reserved for JotForm
// visit here for youtube player API ; https://developers.google.com/youtube/iframe_api_reference

var player, newurl;
var required = false;
// instance script of youtube player API. but not working yet.
var tag = document.createElement('script');
var firstScriptTag = document.getElementsByTagName('script')[0];
// this variable takes information about video.
var active = [];

// The API will call this function when the page has finished downloading the JavaScript for the
// player API, which enables you to then use the API on your page. 
function onYouTubeIframeAPIReady() {
  // controls : hide the video player's controls to prevent forward winding.
  // rel : indicates whether the player should show related videos after current video finished.
  // videoId : this is video url.
  player = new YT.Player('player', {
    height: '350',
    width: '100%',
    videoId: newurl,
    playerVars : { controls : 0 , rel : 0},
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

// This event will be fired when form is ready and your field iframe loaded successfully.
JFCustomWidget.subscribe("ready", function(){
  // get video url given by widget's user. ( Url = parameter)
  var myurl = JFCustomWidget.getWidgetSetting('Url');
  // get video title given by widget's user. ( Question = paramter)
  // if it has not been specified, then there will be not title, otherwise show title.
  var title = JFCustomWidget.getWidgetSetting('Question')===undefined ? "" : JFCustomWidget.getWidgetSetting('Question');
  // get video url's id. Image that the url is 'https://www.youtube.com/watch?v=VXgvKLlBsmE',
  // then id will be 'VXgvKLlBsmE'. So split video url according to specific tag and assign it.
  newurl = myurl.split("?v=")[1];
  // set TITLE
  document.getElementById("label").innerHTML = "<b>" + title + "</b>";

  // initialize youtube player API here
  tag.src = "https://www.youtube.com/iframe_api";
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  // this event will be fired when form is submitted
  JFCustomWidget.subscribe("submit", function(){
    // create object to widget result
    var msg = {};
    // property will be expected before form can be submitted, depends on "required" value.
    msg.valid = required;
    if(required)
      msg.value = "watched";
    // send value to JotForm
    JFCustomWidget.sendSubmit(msg);
  });
});

function onPlayerReady(event) {
  // this function will be called when youtube player api is ready.
  console.log("api is ready");
}

// This event fires whenever the player's state changes such as unstarted,ended,playing,paused.
function onPlayerStateChange(event) {
  switch(event.data){
    // if current state is "playing", then hide the warning message and show informations
    // about video such as "watched time","total time" and "compeleted percent" after calculating them.
    case YT.PlayerState.PLAYING:
      document.getElementById("warning").style.visibility="hidden";
      active[0] = setInterval(function(){
        let a = event.target.getDuration();
        var b = event.target.getCurrentTime();
        info(a,b);
      },500);
      break;
    // if current state is "paused", show warning message and clear all informations.
    case YT.PlayerState.PAUSED:
      document.getElementById("warning").style.visibility="visible";
      clearIntervals();
      break;
    // when video şs ended, the form is ready for submiting.
    case YT.PlayerState.ENDED:
      required = true;
      break;
  }
}

// calculate percent 
function percent(current,total){
return Math.round((current/total)*100);
}

// all informations provided by youtube player api give times in terms of "SECONDs".
// so, convert it to hour/minute/second. it is fancy time format.
function fancyTimeFormat(time){   

  var hrs = ~~(time / 3600);
  var mins = ~~((time % 3600) / 60);
  var secs = ~~(time % 60);

  var ret = "";
  if (hrs > 0) 
      ret += "" + hrs + ":" + (mins < 10 ? "0" : "");

  ret += "" + mins + ":" + (secs < 10 ? "0" : "");
  ret += "" + secs;
  return ret;
}

// information about video
function info(a,b){
  document.getElementById("duration").innerHTML = "<b>Video duration</b> "+fancyTimeFormat(a);
  document.getElementById("time").innerHTML = "<b>Current time</b> "+ fancyTimeFormat(b);
  document.getElementById("percent").innerHTML = "<b>Completed</b> %" + percent(b,a);
};

// clear informations about video.
function clearIntervals(){
  clearInterval(active[0]);
} 