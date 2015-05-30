chrome.runtime.onConnect.addListener(function(port) {
  port.onMessage.addListener(function(message) {
    if(message.type == "save_email_id") {
      console.log("Saving message", message.id)
      chrome.storage.local.set({"local_msg_id" : message.id});
    }
  });
});