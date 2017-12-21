
module.exports = {
  zumo: {
    name: 'zumo',
    baud: 57600,
    signature: new Buffer([0x1e, 0x95, 0x87]),
    productId: ['0x0036', '0x8036', '0x800c', '0x8036', '0x2300', '0x101'],
    protocol: 'avr109'
  },
  leonardo: {
    name: 'leonardo',
    baud: 57600,
    signature: new Buffer([0x43, 0x41, 0x54, 0x45, 0x52, 0x49, 0x4e]),
    productId: ['0x0036', '0x8036', '0x800c', '0x101'],
    protocol: 'avr109'
  }
}
