// gmail code
var gmail;
//construct message body
var SERVER_ADDRESS = "https://rawgit.com/bastovd/stampz/master/";
var image_address_default = '"https://rawgit.com/bastovd/stampz/master/0-thumbnail.png"';
var image_address;// = '"https://rawgit.com/bastovd/stampz/master/stamp_sample.png"';

var isSignaturePreserved = false;

var runCode = function() {
  gmail = Gmail();
  logOut();
  var email_data = gmail.get.email_data();
  if(email_data) {
    window.postMessage({"type" : "edata", "str_data" : JSON.stringify(email_data) }, '*');
  }

  gmail.observe.on('show_newly_arrived_message', function(id, url, body) {
    console.log('new email!', id);
    window.postMessage({ "type": "new_email", "message_id": id }, "*");
  });
  
  //alert(gmail.get.user_email());
  
  //add button to toolbar
  gmail.tools.add_toolbar_button('stamp', function() {
  // Code here
  }, 'Custom Style Classes');
  ///////////////////////
  
  //observer for compose email
  gmail.observe.on('compose', function(compose,type) {
    window.setTimeout( function() {
		
		//add compose button
		var compose_ref = gmail.dom.composes()[0];
		image_address = SERVER_ADDRESS+'0-thumbnail.png';
		setBodyHTML();
		isSignaturePreserved = true;
		checkCurrentUser();
		
		gmail.tools.add_compose_button(compose_ref, compose_button_html, function() {
		  // Code here
			if (LOGIN_MODE == "ACTIVE") {
				//modal window for stamps client interface
				gmail.tools.add_modal_window('Stamps', modal_html, 
				function() { //ok
					var compose_ref = gmail.dom.composes()[0];
					//image_address = img;
					//image_address = '"https://rawgit.com/bastovd/stampz/master/stamp_sample2.png"'
					setBodyHTML(compose_ref);
					compose_ref.body(html);
					removeId('#gmailJsModalBackground');
					removeId('#gmailJsModalWindow');
				}, 
				function() { //cancel
					removeId('#gmailJsModalBackground');
					removeId('#gmailJsModalWindow');	
				});
			}
			else {//authentication modal window
				gmail.tools.add_helper_modal_window('Login', login_html);
				onAuthModalOpen();
			}
		}, '');
		///////////////////////////
		
        compose.subject('THIS TEST');
        compose.body(html);
    },0);
  });
}

var removeId = function(id) {
	$(id).remove();
}

var stamp_id = "";
var stamp_objid = "";
var setStamp = function(img, stampid, stampobjid) {
	image_address = img;
	stamp_id = stampid;
	stamp_objid = stampobjid;
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
	
	//load external files into variables
	var client = new XMLHttpRequest();
	//load modal.html
	$.ajax({
		type: 'GET',
		url: SERVER_ADDRESS+'backbone.html',
		success: function (file_html) {
			// success
			modal_html += file_html;
			//alert('success : ' + file_html);
		}
	});
	$.ajax({
		type: 'GET',
		url: SERVER_ADDRESS+'login.html',
		success: function (file_html) {
			// success
			login_html += file_html;
			//alert('success : ' + file_html);
		}
	});
	/*client.open('GET', SERVER_ADDRESS+'modal.html');
	client.onreadystatechange = function() {
		modal_html += client.responseText;  
	}
	client.send();*/
	//load modal.html
	/*client.open('GET', SERVER_ADDRESS+'backbone.html');
	client.onreadystatechange = function() {
		html_modal += client.responseText;  
	}
	client.send();*/
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
function setBodyHTML(compose_ref) {
	var e = gmail.dom.composes()[0];
	var prev_body = e.body();
	var body_text_div = document.getElementById("body-text-div");
	var init_text = " Dear ... ";
	var new_text = '';
	if (body_text_div != null) {
		var texts = body_text_div.children;//document.getElementsByClassName("body-text");
		for (var i = 0; i < texts.length; i++) {
			var paragraph = '<p class="body-text">';
			var txt = texts[i].innerHTML+'';
			paragraph += txt + '</p>';
			new_text += paragraph;
		}
	}
	else {
		var paragraph = '<p class="body-text"> ' + init_text + ' </p>';
		new_text += paragraph;
	}
	if (!isSignaturePreserved || !(prev_body.indexOf('<title>virtual stamp</title>') > 0)) {
		//alert (prev_body);
		new_text += prev_body;
	}
	//fix copying of body: possible: "gmail_signature" tag + if (body empty);
html =  
'<head> \
<title>virtual stamp</title> \
<script type="text/javascript"> \
	function changeStamp() { \
		document.getElementById("body-text").innerHTML = "Dear ME"; \
	} \
	if (!isExtensionInstalledChecker) { \
		$("#stamp-a").css("display","inherit !important"); \
	} \
	else { \
		$("#stamp-a").css("display","none !important"); \
	} \
</script> \
</head> \
<body> \
	<div id="stamp-container" style="width: 100%; \
															height: 150px; \
															text-align:right; \
															position:relative;"> \
		<!--<a id="stamp-a" onmouseover="" style="cursor: pointer;" href=' + image_address + '> \
			<div style="width:100px;position:absolute;margin-left:-40%;z-index:2; \
						background: url("https://rawgit.com/bastovd/stampz/master/press.png");"> \
						</div> \
		</a>--> \
		<a href="https://rawgit.com/bastovd/stampz/master/" target="_blank"> \
		<div id="stamp" style="height: 150px; \
								width: 115px; \
								position: absolute; \
								background: url(' + image_address + ') no-repeat right top / 100%; \
								margin-left: 75%; \
								cursor:pointer"> \
			<div class="id-holder" id="'+stamp_id+'" style="display:none;">.</div> \
			<div class="objid-holder" id="'+stamp_objid+'" style="display:none;">.</div> \
		</div></a> \
	</div> \
	<br> \
	<div id="body-text-div">' + new_text + 
	'</div> \
</body>';
}

/*
<style> \
	#stamp-container { \
		width: 500px; \
		height: 150px; \
		text-align:right; \
		position:relative; \
	} \
	#stamp { \
		height: 90%; \
		width: 20.7%; \
		top:5%; \
		right: 2%; \
		position: absolute; \
		background: url(' + image_address + '); \
		background-size: auto 100%; \
	} \
</style> \
*/

/*--------EXTERNAL RESOURCE VARIABLES------------*/
//modal window html
var modal_html = '';
var html_modal = '';
var login_html = '';

var compose_button_html =
'<img src="https://rawgit.com/bastovd/stampz/master/icon.png" width="24px" height="24px" />';