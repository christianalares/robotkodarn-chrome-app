const uploader = require('./lib/flash');
const serial = require('./lib/serial');
const Avrgirl = require('avrgirl-arduino');

/**
 * When the webpage sends a message and we recive it,
 * pass info to uploader and request a flash to the device.
 */
chrome.runtime.onConnectExternal.addListener(port => {
  port.onMessage.addListener(msg => {

    switch (msg.type) {

      // If the message type is flash
      case 'flash':

        serial.close(() => {
          // Call flash process
          uploader.flash(msg.board, msg.file, error => {
            // Prepare the response object
            const message = error ? { error: error.message } : { success: true };

            // Send back the status of the flash to the webpage so it knows when it's done/errored.
            port.postMessage(message);
          });
        });

        break;
    
      // If the message type is ping
      case 'ping':
        port.postMessage({
          success: true
        });

        break;

      // If the message type is list
      case 'list':
        Avrgirl.list((error, ports) => {
          const message = error ? { error: error } : { usbPorts: ports };
          port.postMessage(message);
        });

        break;

      case 'serial':
        serial.close(() => {
          serial.listen({
            board: msg.board,
            baudrate: msg.baudrate
          }, (error, data) => {
            if(error) {
              const messgage = {error};
              console.log(`failed to open: ${error.message}`)
              return port.postMessage(message);
            }

            port.postMessage({
              serialData: new TextDecoder("utf-8").decode(data)
            });
          });
        });
      break;

      default:
        console.log( 'Recieved ' + msg)
      break;
    }
  });
});
