const log = require('intel').getLogger('test.server');
const Brest = require('brest');
const BrestValidate = require('../../index');

const brest = new Brest(require('./settings'), [BrestValidate]);

brest.on('error', (err) => {
    log.error(err);
});
