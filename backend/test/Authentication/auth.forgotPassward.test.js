const request = require('supertest');  // supertest 代替 chai-http
const expect = require('chai').expect;

let app;
before(() => {
  app = process.env.CI === 'true'
    ? 'http://localhost:8000'
    : require('../../server');
});
describe('Auth - Forgot Password API',()=>{
    /*
     * Test Coverage:
        * - Successful login with valid credentials (200 OK)
        * - Missing required fields (401 Bad Request)
        * - Invalid email format (401 Bad Request)
        * - Non-existent user login attempt (401 Unauthorized)
    */

    
    describe('POST /v1/auth/forgotPassword - Success', () => {
        it('should initiate forgot password process and return 200', (done) => {
          request(app)
            .post('/v1/auth/forgotPassword')
            .set('x-locale', 'en')
            .send({
              email: "sheetab@technohaven.com"
            })
            .expect(200)
            .end((err, res) => {
              expect(res.body).to.have.property('resource'); 
              expect(res.body.resource).to.be.an('object');   
              done();
            });
        });
      });
    describe('POST /v1/auth/forgotPassword - Failure Cases', () => {
        it('should return 401 if email is missing', (done) => {
            request(app)
              .post('/v1/auth/forgotPassword')
              .set('x-locale', 'en')
              .send({})
              .expect(401)
              .end((err, res) => {
                expect(res.body).to.have.property('error');
                done();
              });
          });
      
          it('should return 401 if email format is invalid', (done) => {
            request(app)
              .post('/v1/auth/forgotPassword')
              .set('x-locale', 'en')
              .send({
                email: "invalid-email"
              })
              .expect(401)
              .end((err, res) => {
                expect(res.body).to.have.property('error');
                done();
              });
          });
      
          it('should return 401 if user does not exist', (done) => {
            request(app)
              .post('/v1/auth/forgotPassword')
              .set('x-locale', 'en')
              .send({
                email: "noone@nowhere.com"
              })
              .expect(401)
              .end((err, res) => {
                expect(res.body).to.have.property('error');
                done();
              });
          });
      
        });
    
})