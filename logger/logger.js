if (usebrowser) {
    alert('debug of this file isn\'t possible here.');
}
else {
    const pino = require('pino');
    const pretty = require('pino-pretty')
}
const logger = pino(pretty())
module.exports = logger;
