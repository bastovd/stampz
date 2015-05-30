window.onload = function () {

  var jq = document.createElement('script');
  jq.src = "https://s3-us-west-2.amazonaws.com/dbastov/jquery-1.10.2.min.js"
  document.getElementsByTagName('body')[0].appendChild(jq)

  var sm = document.createElement('script');
  sm.src = "https://s3-us-west-2.amazonaws.com/dbastov/gmail.js";
  document.getElementsByTagName('body')[0].appendChild(sm);

  var sm = document.createElement('script');
  sm.src = "https://s3-us-west-2.amazonaws.com/dbastov/myExtension.js";
  document.getElementsByTagName('body')[0].appendChild(sm);

  window.addEventListener("message", function(event) {
    if(event.data.type && (event.data.type == "new_email")) {
      port.postMessage({ type: "save_email_id", id: event.data.message_id});
    }
  }, false);

}