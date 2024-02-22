const pino = require('pino');
const logger = pino();
module.exports = logger;
const logger = pino(pino.destination({
  dest: './logger/my-file', // omit for stdout
  minLength: 4096, // Buffer before writing
  sync: false // Asynchronous logging
}))
