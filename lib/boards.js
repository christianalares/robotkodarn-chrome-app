
module.exports = {
  zumo: {
    name: 'zumo',
    baud: 57600,
    signature: new Buffer([0x1e, 0x95, 0x87]),
    productId: ['0x0036', '0x8036', '0x800c', '0x8036', '0x2300'],
    protocol: 'avr109',
    manualReset: true
  }
}