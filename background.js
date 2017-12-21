const uploader = require('./lib/flash');
const serial = require('./lib/serial');
const Avrgirl = require('avrgirl-arduino');

const customBoards = require('./lib/boards');

const checkZumoBootloaderMode = (done) => {
  let retries = 30;

  const performCheck = () => {
    Avrgirl.list((error, ports) => {
      if(error) return done(error.message);

      const zumoBootPort = ports.filter((port) => port.productId === '0x101' && port.comName.indexOf("tty") > -1).length;

      retries--;

      if(!zumoBootPort) {
        // Send back the status of the flash to the webpage so it knows when it's done/errored.
        done();

      } else if(retries <= 0) {
        done('timeout');

      } else {
        setTimeout(() => performCheck(), 1000);
      }
    });
  }

  performCheck();
};

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
          let board = msg.board;

          if(msg.board in customBoards) {
            board = customBoards[msg.board];
          }

          // Call flash process
          uploader.flash(board, msg.file, error => {
            // Prepare the response object
            let message = error ? { error: error.message } : { success: true };

            if(error) return port.postMessage(message);

            const done = (error) => {
              if(error) message = {error};

              port.postMessage(message);
            }

            checkZumoBootloaderMode(done);
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

      case 'version':
        const version = chrome.runtime.getManifest().version;

        port.postMessage({
          version
        });
      break;

      default:
        console.log( 'Recieved ' + msg)
      break;
    }
  });
});
