const Avrgirl = require('avrgirl-arduino');

module.exports.flash = (board, file, callback) => {
  const avrgirl = new Avrgirl({
    board: board,
    debug: true
  });

  // Convert the contents to a buffer, as avrgirl is expecting
  const hex = new Buffer(file);

  // Call flash method
  avrgirl.flash(hex, (error) => {
    return callback(error);
  });
}
