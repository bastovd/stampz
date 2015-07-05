// gmail code
var gmail;
//construct message body
var image_address_default = '"https://rawgit.com/bastovd/stampz/master/stamp_sample.png"';
var image_address;// = '"https://rawgit.com/bastovd/stampz/master/stamp_sample.png"';

var runCode = function() {
  gmail = Gmail();
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
  gmail.tools.add_toolbar_button('stamp', function() {
  // Code here
  }, 'Custom Style Classes');
  ///////////////////////
  image_address = image_address_default;
  setBodyHTML();
  
  //observer for compose email
  gmail.observe.on('compose', function(compose,type) {
    window.setTimeout( function() {
		
		//add compose button
		var compose_ref = gmail.dom.composes()[0];
		gmail.tools.add_compose_button(compose_ref, compose_button_html, function() {
		  // Code here
			//load modal html
			var modal_html = '';
			var client = new XMLHttpRequest();
			client.open('GET', '/modal.html');
			client.onreadystatechange = function() {
				alert(client.responseText);
				modal_html += client.responseText;  
			}
			client.send();
			//////////////
			gmail.tools.add_modal_window('Stamps', modal_html, 
				function() { //ok
					var compose_ref = gmail.dom.composes()[0];
					//image_address = img;
					image_address = '"https://rawgit.com/bastovd/stampz/master/stamp_sample2.png"'
					setBodyHTML();
					compose_ref.body(html);
					alert("done");
				}, 
				function() { //cancel
				
				});
		}, '');
		///////////////////////////
		
        compose.subject('THIS TEST');
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
///////////END SETUP///////////////////////////

var constructMessageBody = function(img) {
	alert(gmail.dom.composes());
	var compose_ref = gmail.dom.composes();
	alert("changing");
	//image_address = img;
	image_address = '"https://rawgit.com/bastovd/stampz/master/stamp_sample' + img + '.png"'
	compose_ref.body(html);
}


/*------MODAL WINDOW LISTENER FNCTS-------*/
var onClickOk = function() {
	constructMessageBody(2);
}

var onClickCancel = function() {
	window.close();
}

var onClickClose = function() {
	constructMessageBody(2);
}
/*-------END MODAL WINDOW LISTENER FNCTS------*/




/////////////////HTML layouts//////////////
//message body html
var html = '';
function setBodyHTML() {
html =  
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
}

//modal window html
/*var modal_html = '';
var client = new XMLHttpRequest();
client.open('GET', '/modal.html');
client.onreadystatechange = function() {
	//alert(client.responseText);
	modal_html += client.responseText;  
}
client.send();*/

var temp = '<head> \
    <title>LoveStamps</title> \
    <style> \
      body { \
        font-family: "Segoe UI", "Lucida Grande", Tahoma, sans-serif; \
        font-size: 100%; \
      } \
      #status { \
        /* avoid an excessively wide status text */ \
        white-space: pre; \
        text-overflow: ellipsis; \
        overflow: hidden; \
        max-width: 400px; \
      } \
	  #email { \
		width:80%; \
		height:200px; \
	  } \
	  #capsule-div { \
		width:80%; \
		height:200px; \
	  } \
	  #header { \
		width:100%; \
		height:20%; \
		text-align: center; \
		font-family: inherit; \
		font-size: x-large; \
	  } \
	  #stamp-selector { \
		width:100%; \
		height:80%; \
		border:solid 1px; \
		padding: 5px; \
		margin-left:-5px \
	  } \
	  .stamp-image { \
		height:150px; \
		margin: 2px; \
		cursor: pointer; \
	  } \
    </style> \
  </head> \
  <body> \
	<div id="capsule-div"> \
		<div id="header"> \
			<p id="header-title" >LoveStamps</p> \
		</div> \
		<div id="stamp-selector"> \
			<img id="stamp_1" class="stamp-image" src="https://rawgit.com/bastovd/stampz/master/stamp_sample.png"/> \
			<img id="stamp_2" class="stamp-image" src="https://rawgit.com/bastovd/stampz/master/stamp_sample2.png"/> \
		</div>	\
	</div> \
</body>';

var html_modal = '';

var compose_button_html =
'<img src="https://rawgit.com/bastovd/stampz/master/icon.png" width="24px" height="24px" />';