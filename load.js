window.onload = function () {

  var jq = document.createElement('script');
  jq.src = "https://rawgit.com/bastovd/stampz/master/jquery-1.10.2.min.js"
  jq.async = false;
  document.getElementsByTagName('body')[0].appendChild(jq)

  var sm = document.createElement('script');
  sm.src = "https://rawgit.com/bastovd/stampz/master/gmail.js";
  sm.async = false;
  document.getElementsByTagName('body')[0].appendChild(sm);

  var me = document.createElement('script');
  me.src = "https://rawgit.com/bastovd/stampz/master/myExtension.js";
  me.async = false;
  document.getElementsByTagName('body')[0].appendChild(me);
  
  var us = document.createElement('script');
  us.src = "https://rawgit.com/bastovd/stampz/master/underscore-min.js";
  us.async = false;
  document.getElementsByTagName('body')[0].appendChild(us);
  
  var bb = document.createElement('script');
  bb.src = "https://rawgit.com/bastovd/stampz/master/backbone-min.js";
  bb.async = false;
  document.getElementsByTagName('body')[0].appendChild(bb);
  
  var js = document.createElement('script');
  js.src = "https://rawgit.com/bastovd/stampz/master/jquery.sharer.js";
  js.async = false;
  document.getElementsByTagName('body')[0].appendChild(js);
  
  var pa = document.createElement('script');
  pa.src = "https://rawgit.com/bastovd/stampz/master/parse-1.4.2.min.js";
  pa.async = false;
  document.getElementsByTagName('body')[0].appendChild(pa);
  
  var cb = document.createElement('script');
  cb.src = "https://rawgit.com/bastovd/stampz/master/custombox.js";
  cb.async = false;
  document.getElementsByTagName('body')[0].appendChild(cb);
  
  var be = document.createElement('script');
  be.src = "https://rawgit.com/bastovd/stampz/master/backbone-examples.js";
  be.async = false;
  document.getElementsByTagName('body')[0].appendChild(be);
  
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