var uploader = require('./lib/flash');
const Avrgirl = require('avrgirl-arduino');

chrome.runtime.onMessageExternal.addListener( (request, sender, sendResponse) => {
  /**
   * When the webpage sends a pinged message we answer with a reply
   * to let the user know it has contact with this Chrome App
   */
  if (request && request.message == "ping") {
    sendResponse({
      response: 'pong'
    });

  /**
   * When the webpage sends "list" as message we return an array
   * with connected arduino devices
  */
  } else if(request && request.message == "list") {
    Avrgirl.list((error, ports) => {
      const message = error ? { error: error } : { ports: ports };
      sendResponse(message);
    });
  }
  return true;
});


/**
 * When the webpage sends a message and we recive it,
 * pass info to uploader and request a flash to the device.
 */
chrome.runtime.onConnectExternal.addListener(port => {
  port.onMessage.addListener(msg => {
    // Call flash process
    uploader.flash(msg.board, msg.file, error => {
      // Prepare the response object
      const message = error ? { error: error.message } : { success: true };

      // Send back the status of the flash to the webpage so it knows when it's done/errored.
      port.postMessage(message);
    });
  });
});
