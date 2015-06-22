function closeWindow() {
	window.close();
}

var num_stamps = 2;
var curr_stamp = document.getElementById("stamp_1").src;
//add event listener to the close button
var closeBtn = document.getElementById("close_button");
closeBtn.addEventListener('click', closeWindow);
//add event listener to stamp buttons
for (var i = 1; i <= num_stamps; i++) {
	var s = "stamp_"+i;
	var stampBtn = document.getElementById(s)
	stampBtn.addEventListener('click', updateCurrentStamp);
}

function updateCurrentStamp() {
	var curr_stamp = this.src;
	alert(curr_stamp);
}


document.addEventListener('DOMContentLoaded', function () {
	
});
