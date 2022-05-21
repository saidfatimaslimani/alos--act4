var request = require('supertest');
var should = require('should');
var server = require('../server/server');

describe('Users API', () => {

 
  var app = null;
  var testUsers = [{
      email: 'sd@thesimpsons.com',
      phone_number: '+1 234 5678'
    }, {
      email: 'slimani@thesimpsons.com',
      phone_number: '+1 234 5679'
    }
  ];
  var testRepo = {
    getUsers: () => { 
      return Promise.resolve(testUsers);
    },
    getUserByEmail: (email) => { 
      return Promise.resolve(testUsers.find((user) => {
        return user.email === email;
      }));
    }
  };
  
  beforeEach(() => {
    return server.start({
      port: 147,
      repository: testRepo
    }).then(function (svr) {
      app = svr;
    });
  });

  afterEach(() => {
    app.close();
    app = null;
  });

  it('can return all users', (done) => {

    request(app)
      .get('/users')
      .expect(function(res) {
        res.body.should.containEql({
          email: 'sd@thesimpsons.com',
          phoneNumber: '+1 234 5678'
        });
      res.body.should.containEql({
          email: 'slimani@thesimpsons.com',
          phoneNumber: '+1 234 5679'
        });
      })
      .expect(200, done);

  });

  it('returns a 404 for an unknown user', (done) => {

    request(app)
      .get('/search?email=fatma@thegumbles.com')
      .expect(404, done);
  });

  it('returns a 200 for a known user', (done) => {

    request(app)
      .get('/search?email=sd@thesimpsons.com')
      .expect(200, done);
  });

});