function closeWindow() {
	alert("closing");
	window.close();
}

var curr_stamp = document.getObjectById('stamp_1').src;
alert(curr_stamp);

function updateCurrentStamp(stamp_id) {
	var obj = document.getOjectById(stamp_id).src;
	curr_stamp = obj;
	alert(curr_stamp);
}