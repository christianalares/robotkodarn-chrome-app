const Avrgirl = require('avrgirl-arduino');

module.exports.list = (callback) => {
  Avrgirl.list((err, ports) => {
    return callback(ports, err)
  });
}
