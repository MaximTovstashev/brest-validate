/* eslint-disable no-undef */
const generic = require('../generic'),
  chai = generic.chai,
  expect = chai.expect,
  request = generic.request('http://localhost:8080/v1/basic');

const basic_data = require('../test_data').basic;

it('Should return JSON data on GET request', (done) => {
  request
    .get('/12')
    .then((res) => {
      //noinspection BadExpressionStatementJS
      expect(res).to.be.OK;
      expect(res.body).to.be.eql(basic_data);
      expect(res).to.have.status(200);
      done();
    })
    .catch(done);
});

it('Should return default error code on incorrect request', (done) => {
  request
    .get('/errorQuery')
    .end((err, res) => {
      //noinspection BadExpressionStatementJS
      expect(res).to.be.OK;
      //noinspection BadExpressionStatementJS
      expect(res.body).to.be.eql({ "body": [
          {
            "location": "params",
            "msg": "Invalid Id",
            "param": "id",
            "value": "errorQuery",
          },
          {
            "location": "params",
            "msg": "Invalid Id",
            "param": "id",
            "value": "errorQuery",
          }
      ]
    });
      expect(res).to.have.status(422);
      done();
    });
});
