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
  
  //add button to toolbar
  gmail.tools.add_toolbar_button('content_html', function() {
  // Code here
  }, 'Custom Style Classes');
  ///////////////////////
  //image_address = image_address_default;
  
  //observer for compose email
  gmail.observe.on('compose', function(compose,type) {
    window.setTimeout( function() {
		
		//add compose button
		var compose_ref = gmail.dom.composes()[0];
		gmail.tools.add_compose_button(compose_ref, 'content_html', function() {
		  // Code here
		}, 'Custom Style Classes');
		///////////////////////////
		
        compose.subject('TEST');
        compose.body(html);
    },0);
  });
}

//construct message body
var image_address_default = '"https://rawgit.com/bastovd/stampz/master/stamp_sample.png"';
var image_address;

var constructMessageBody = function(img) {
	var compose_ref = gmail.dom.composes()[0];
	//image_address = img;
	image_address = '"https://rawgit.com/bastovd/stampz/master/stamp_sample' + img + '.png"'
	compose_ref.body(html);
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
var image_address = '"https://rawgit.com/bastovd/stampz/master/stamp_sample.png"';
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
		background: url(' + image_address + '); \
		background-size: auto 100%; \
	} \
</style> \
</head> \
<body> \
	<div id="stamp-container" onclick="changeStamp()"> \
		<a id="stamp-a" onmouseover="" style="cursor: pointer;" href=' + image_address + '> \
		<div id="stamp"> \
		</div></a> \
	</div> \
	<br> \
	<p id="body-text"> Dear ... </p> \
</body>';