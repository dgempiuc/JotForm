// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal and give ChatForm embed code
function generate(id) {
    modal.style.display = "block";
	var p = document.createElement("p");
	p.setAttribute('style','color:brown;background-color:white');
	var t = document.createTextNode('<iframe width="100%" height="100%" src="http://dev.cs.hacettepe.edu.tr/~b21328045/jotform/chatform/build/index.html?id='+id+'"frameBorder="0"></iframe>'); 
	p.appendChild(t);
	p.setAttribute("id","myid");
	document.getElementsByClassName("modal-body")[0].appendChild(p);
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
	document.getElementById("myid").remove();
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
		document.getElementById("myid").remove();
    }
}