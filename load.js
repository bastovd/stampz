window.onload = function () {

  var jq = document.createElement('script');
  jq.src = "https://rawgit.com/bastovd/stampz/master/jquery-1.10.2.min.js"
  document.getElementsByTagName('body')[0].appendChild(jq)

  var sm = document.createElement('script');
  sm.src = "https://rawgit.com/bastovd/stampz/master/gmail.js";
  document.getElementsByTagName('body')[0].appendChild(sm);

  var sm = document.createElement('script');
  sm.src = "https://rawgit.com/bastovd/stampz/master/myExtension.js";
  document.getElementsByTagName('body')[0].appendChild(sm);
  
  var bcss = document.createElement('style');
  bcss.type = 'text/css';
  bcss.href = "https://rawgit.com/bastovd/stampz/master/backbone.css";
  document.getElementsByTagName('head')[0].appendChild(bcss);

  window.addEventListener("message", function(event) {
    if(event.data.type && (event.data.type == "new_email")) {
      port.postMessage({ type: "save_email_id", id: event.data.message_id});
    }
  }, false);

}