const path = require('path');
const log = require('intel').getLogger('test.server');
const Brest = require('brest');
const BrestValidate = require('../../index');

const brest = new Brest(require('./settings'));
brest.on('ready', () => {
    brest.use([BrestValidate]);
});
brest.on('error', (err) => {
    log.error(err);
});