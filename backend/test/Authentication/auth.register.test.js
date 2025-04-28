const request = require('supertest');  // supertest 代替 chai-http
const app = require('../../server');
const expect = require('chai').expect;

describe('Auth - Register API',()=>{
    /*
     * Test Coverage:
     * - Successful login with valid credentials (200 OK)
     * - Missing required fields (401 Bad Request)
     * - Invalid email format (401 Bad Request)
     * - Duplicate email registration attempt (409 Conflict)
     */
    describe('POST /v1/auth/register - Success', () => {
        it('should register a user and return 200', (done) => {
          request(app)
            .post('/v1/auth/register')
            .set('x-locale', 'en')
            .send({
              email: `testuser_${Date.now()}@domain.com`, // Unique email for each test
              password: "123456",
              firstName: "Test",
              lastName: "User",
              expire: true
            })
            .expect(200)
            .end((err, res) => {
              expect(res.body).to.have.property('resource'); 
              expect(res.body.resource).to.be.an('object'); 
              done();
            });
        });
      });
    describe('POST /v1/auth/register - Failure Cases', () => {
        it('should return 401 if email is missing', (done) => {
          request(app)
            .post('/v1/auth/register')
            .set('x-locale', 'en')
            .send({
              password: "123456",
              firstName: "Test",
              lastName: "User",
              expire: true
            })
            .expect(401)
            .end((err, res) => {
                expect(res.body).to.have.property('error');
                done();
            });
        });
        it('should return 401 if password is missing', (done) => {
          request(app)
            .post('/v1/auth/register')
            .set('x-locale', 'en')
            .send({
              email:  `testuser2_${Date.now()}@domain.com`, // Unique email for each test
              firstName: "Test",
              lastName: "User",
              expire: true
            })
            .expect(401)
            .end((err, res) => {
              expect(res.body).to.have.property('error');
              done();
            });
        });
        it('should return 401 if email is invalid', (done) => {
          request(app)
            .post('/v1/auth/register')
            .set('x-locale', 'en')
            .send({
              email: "invalidemail",
              password: "123456",
              firstName: "Test",
              lastName: "User",
              expire: true
            })
            .expect(401)
            .end((err, res) => {
              expect(res.body).to.have.property('error');
              done();
            });
        });
        it('should return 409 if email is already registered', (done) => {
          const existingEmail = "sheetab@technohaven.com";
          request(app)
            .post('/v1/auth/register')
            .set('x-locale', 'en')
            .send({
              email: existingEmail,
              password: "123456",
              firstName: "Test",
              lastName: "User",
              expire: true
            })
            .expect(409)
            .end((err, res) => {
              expect(res.body).to.have.property('error');
              done();
            });
        });
    })
})
