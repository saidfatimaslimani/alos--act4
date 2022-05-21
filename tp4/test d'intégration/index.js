
var supertest = require('supertest');
var should = require('should');

describe('users-service', () => {

  var api = supertest('http://localhost:8147');

  it('returns a 200 for a known user', (done) => {

    api.get('/search?email=sd@thesimpsons.com')
      .expect(200, done);
  });

});