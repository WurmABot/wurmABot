const pino = require('pino');
//const logger = pino();
const logger = pino(pino.destination({
  dest: './logger/my-file', // omit for stdout
  minLength: 1024, // Buffer before writing
  sync: false // Asynchronous logging
}))
module.exports = logger;
