var uploader = require('./lib/flash');

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
