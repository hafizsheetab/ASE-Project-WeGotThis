const request = require('supertest');  // supertest 代替 chai-http
const app = require('../../server');
const expect = require('chai').expect;

describe('Auth - Reset Password API',()=>{
    /*
     * Test Coverage:
        * - Successful password reset with valid token and payload (200 OK)
        * - Invalid token (401 Unauthorized)
        * - Invalid password format (401 Bad Request)
    */
    let validToken; 
    const testEmail = `testuser_${Date.now()}@testmail.com`;
    const testPassword = "testPassword123";
  
  
    before((done) => {
      request(app)
        .post('/api/v1/auth/register')
        .send({
          email: testEmail,
          password: testPassword,
          firstName: "Test",
          lastName: "User",
          expire: true
        })
        .end((err, res) => {
          if (err) return done(err);
  
          request(app)
            .post('/v1/auth/login')
            .set('x-locale', 'en')
            .send({
              email: testEmail,
              password: testPassword,
              expire: true
            })
            .end((err, res) => {
              if (err) return done(err);
              validToken = res.body.resource.token;
              done();
            });
        });
    });
    
    describe('POST /v1/auth/resetPassword - Success', () => {
        it('should reset password successfully with valid token and payload', (done) => {
            const validToken='your_valid_token_here'; // Replace with a valid token
            request(app)
            .post('/v1/auth/resetPassword')
            .set('Authorization', `Bearer ${validToken}`)
            .send({
              password: "newpassword123",
            })
            .expect(200)
            .end((err, res) => {
              expect(res.body).to.have.property('resource'); 
              expect(res.body.resource).to.be.an('object');
              done();
            });
        });
    });
    describe('POST /v1/auth/resetPassword - Failure Cases', () => {
        it('should return 401 if token is missing', (done) => {
            request(app)
            .post('/api/v1/auth/resetPassword')
            .set('x-locale', 'en')
            .send({
              password: "newpassword123",
            })
            .expect(401)
            .end((err, res) => {
              expect(res.body).to.have.property('error');
              done();
            });
        });
        it('should return 401 if password is missing', (done) => {
            request(app)
            .post('/api/v1/auth/resetPassword')
            .set('x-locale', 'en')
            .set('x-locale', 'en')
            .set('Authorization', `Bearer ${validToken}`)
            .send({
              password: "",
            })
            .expect(401)
            .end((err, res) => {
              expect(res.body).to.have.property('error');
              done();
            });
        });
        it('should return 401 if password does not meet criteria', (done) => {
            const validToken = 'your_valid_jwt_token_here';
            request(app)
              .post('/v1/auth/resetPassword')
              .set('x-locale', 'en')
              .set('Authorization', `Bearer ${validToken}`)
              .send({ password: '123' })   
              .expect(401)                
              .end((err, res) => {
                expect(res.body).to.have.property('error');
                done();
              });
        });
    });
});