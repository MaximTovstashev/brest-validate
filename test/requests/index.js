/* eslint-disable no-undef */
const Brest = require('brest');
const BrestValidate = require('../../index');

let brest;

before((done) => {
  const settings = require('../server/settings');
  brest = new Brest(settings, [BrestValidate]);
  brest.use([]);
  brest.on('ready', () => {
    done();
  });
});

describe('Basic API requests', () => require('./basic'));

after((done) => {
  brest.close(() => {
    done();
  });
});