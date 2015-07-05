window.onload = function () {

  var jq = document.createElement('script');
  jq.src = "https://rawgit.com/bastovd/stampz/master/jquery-1.10.2.min.js"
  document.getElementsByTagName('body')[0].appendChild(jq)

  var sm = document.createElement('script');
  sm.src = "https://rawgit.com/bastovd/stampz/master/gmail.js";
  document.getElementsByTagName('body')[0].appendChild(sm);

  sm = document.createElement('script');
  sm.src = "https://rawgit.com/bastovd/stampz/master/myExtension.js";
  document.getElementsByTagName('body')[0].appendChild(sm);
  
  sm = document.createElement('script');
  sm.src = "https://rawgit.com/bastovd/stampz/master/underscore-min.js";
  document.getElementsByTagName('body')[0].appendChild(sm);
  
  sm = document.createElement('script');
  sm.src = "https://rawgit.com/bastovd/stampz/master/backbone-min.js";
  document.getElementsByTagName('body')[0].appendChild(sm);
  
  sm = document.createElement('script');
  sm.src = "https://rawgit.com/bastovd/stampz/master/jquery.sharer.js";
  document.getElementsByTagName('body')[0].appendChild(sm);
  
  sm = document.createElement('script');
  sm.src = "https://rawgit.com/bastovd/stampz/master/parse-1.4.2.min.js";
  document.getElementsByTagName('body')[0].appendChild(sm);
  
  sm = document.createElement('script');
  sm.src = "https://rawgit.com/bastovd/stampz/master/backbone-examples.js";
  document.getElementsByTagName('body')[0].appendChild(sm);
  
  /*-----------modal files---------------*/
	var bcss = document.createElement("link"); //backbone.css
  bcss.setAttribute("rel", "stylesheet");
  bcss.setAttribute("type", "text/css");
  bcss.setAttribute("href", "https://rawgit.com/bastovd/stampz/master/backbone.css");
  document.getElementsByTagName("head")[0].appendChild(bcss);
	var sharecss = document.createElement("link"); //sharer.css
  sharecss.setAttribute("rel", "stylesheet");
  sharecss.setAttribute("type", "text/css");
  sharecss.setAttribute("href", "https://rawgit.com/bastovd/stampz/master/jquery.sharer.css");
  document.getElementsByTagName("head")[0].appendChild(sharecss);

  window.addEventListener("message", function(event) {
    if(event.data.type && (event.data.type == "new_email")) {
      port.postMessage({ type: "save_email_id", id: event.data.message_id});
    }
  }, false);

}