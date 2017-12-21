const Avrgirl = require('avrgirl-arduino');

module.exports.flash = (board, file, callback) => {
  const avrgirl = new Avrgirl({
    board: board,
    debug: true
  });

  // Convert the contents to a buffer, as avrgirl is expecting
  const hex = new Buffer(file);

  let retry = 0;
  if(board.name === 'zumo' || board.name === 'leonardo') {
    retry = 1;
  }

  const flash = () => {
    // Call flash method
    avrgirl.flash(hex, function (error) {
      if(error && retry > 0) {
        retry--;

        flash();
      } else {
        return callback(error);
      }
    });
  }

  flash();
}
