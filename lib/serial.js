const sp = require('browser-serialport');
const SerialPort = sp.SerialPort;

const boards = {
  uno: {
    productId: ['0x0043', '0x7523', '0x0001', '0xea60'],
    serialConfig: {
      dataBits: 8,
      stopBits: 1,
      parity: 'none'
    }
  }
};

const serial = () => {
  let serialPort;

  const getComName = (board, callback) => {
    const productIds = boards[board].productId.map((id) => parseInt(id, 16));

    sp.list((err, ports) => {
      if(err) return callback(err); 
      let comName;

      ports.forEach((port) => {
        if(productIds.indexOf(parseInt(port.productId, 16)) > -1 && port.comName.indexOf("tty") > -1) {
          comName = port.comName;
        }
      });

      if(comName) {
        callback(null, comName);

      } else {
        callback({
          message: "no arduino uno board found"
        });
      }
    });
  };

  return {
    listen: ({board, baudrate}, callback) => {
      getComName(board, (err, comName) => {
        if(err) return callback(err);

        const config = boards.uno.serialConfig;

        serialPort = new SerialPort(comName, Object.assign({}, config, {
          baudrate: baudrate || 57600
        }), false);

        serialPort.open((err) => {
          if(err) return callback(err);

          console.log(`serial port open: ${comName}`);

          serialPort.on("data", data => callback(null, data));
        });

        serialPort.on("close", () => {

        });
      });
    },
    close: (callback) => {
      if(serialPort) {
        serialPort.close(() => {
          console.log("closing serialPort")
          serialPort = null;
          callback();
        });
      } else {
        callback();
      }
    }
  };
};

module.exports = serial();
