// gmail code
var runCode = function() {
  var gmail = Gmail();
  var email_data = gmail.get.email_data();
  if(email_data) {
    window.postMessage({"type" : "edata", "str_data" : JSON.stringify(email_data) }, '*');
  }

  gmail.observe.on('show_newly_arrived_message', function(id, url, body) {
    console.log('new email!', id);
    window.postMessage({ "type": "new_email", "message_id": id }, "*");
  });
  
  alert(gmail.get.user_email());
  
  //observer for compose email
  gmail.observe.on('compose', function(compose,type) {
    window.setTimeout( function() {
        compose.subject('THIS IS A TEST');
        compose.body(html);
    },0);
  });

}

// check if jquery is loaded and init
var checkLoaded = function() {
  if(window.jQuery) {
    $.fn.onAvailable = function(e) {
      var t = this.selector;
      var n = this;
      if (this.length > 0) e.call(this);
      else {
        var r = setInterval(function () {
          if ($(t).length > 0) {
            e.call($(t));
            clearInterval(r);
          }
        }, 50);
      }
    };

    // your code
    runCode();

  } else {
    setTimeout(checkLoaded, 100);
  }
}

checkLoaded();
///////////////////////////////

//message body html
var html = 
'<head> \
<title>virtual stamp</title> \
<script type="text/javascript"> \
	function changeStamp() { \
		document.getElementById("body-text").innerHTML = "Dear ME"; \
	} \
</script> \
<style> \
	#stamp-container { \
		width: 500px; \
		height: 150px; \
		text-align:right; \
		position:relative; \
	} \
	#stamp { \
		height: 90%; \
		width: 22.8%; \
		top:5%; \
		right: 2%; \
		position: absolute; \
		background: url("https://rawgit.com/bastovd/stampz/master/stamp_sample.png"); \
		background-size: auto 100%; \
	} \
</style> \
</head> \
<body> \
	<div id="stamp-container" onclick="changeStamp()"> \
		<a id="stamp-a"onmouseover="" style="cursor: pointer;" href="https://rawgit.com/bastovd/stampz/master/stamp_sample.png"><div id="stamp"> \
		</div></a> \
	</div> \
	<br> \
	<p> Dear ... </p> \
</body>';