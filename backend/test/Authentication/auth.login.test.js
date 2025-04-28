const request = require('supertest');  
const app = require('../../server');
const expect = require('chai').expect;

describe('Auth - Login API',()=>{
  /*
   * Test Coverage:
   * - Successful login with valid credentials (200 OK)
   * - Missing required fields (401 Bad Request)
   * - Invalid email format (401 Bad Request)
   * - Non-existent user login attempt (401 Unauthorized)
   * - Incorrect password login attempt (401 Unauthorized)
   */
  let testEmail;
  const testPassword = "testPassword123";

  // before hook: register a user first
  before((done) => {
    console.log("[DEBUG] Starting registration process...");
    testEmail = `testuser_${Date.now()}@testmail.com`; // Unique email for each test
    request(app)
      .post('/api/v1/auth/register')
      .set('x-locale', 'en')
      .send({
        email: testEmail,
        password: testPassword,
        firstName: "Test",
        lastName: "User",
        expire: true
      })
      .end((err, res) => {
        console.log('[DEBUG] Finished register request', err, res && res.status);
        if (err) return done(err);
        if (!res || res.status !== 200) {
        return done(new Error('Registration failed'));
        }
        done();
      });
  });

    describe('POST /v1/auth/login - Success',()=>{
        it('should login a user and return 200',(done)=>{
            request(app)
                .post('/api/v1/auth/login')
                .set('x-locale', 'en')
                .send({
                    email: testEmail,
                    password: testPassword,
                    expire: true
                })
                .expect(200)
                // .end((err,res)=>{
                //     console.log("response",res.body)
                //     expect(res.body).to.have.property('resource');
                //     done();
                // })
                .then(res => { // supertest支持Promise形式
                  console.log('[DEBUG] login response:', res.body);
                  expect(res.body).to.have.property('resource');
                  done();
              })
              .catch(err => {
                  console.error('[ERROR] login request failed:', err);
                  done(err);
              });
        })
    })
    describe('POST /v1/auth/login - Failure Cases',()=>{
      it ('should return 401 if email is missing', (done) => {
        request(app)
          .post('/api/v1/auth/login')
          .set('x-locale', 'en')
          .send({
            password: testPassword,
            expire: true
          })
          .expect(401)  
          .end((err, res) => {
            expect(res.body).to.have.property('error');
            done();
          });
      })
      it ('should return 401 if password is missing', (done) => {
        request(app)
          .post('/api/v1/auth/login')
          .set('x-locale', 'en')
          .send({
            email: testEmail,
            expire: true
          })
          .expect(401)
          .end((err, res) => {
            expect(res.body).to.have.property('error');
            done();
          });
      })
      it('should return 401 if email is invalid', (done) => {
        request(app)
          .post('/api/v1/auth/login')
          .set('x-locale', 'en')
          .send({
            email: "invalidemail",
            password: testPassword,
            expire: true
          })
          .expect(401)
          .end((err, res) => {
            expect(res.body).to.have.property('error');
            done();
          }
          );
      })
      it('should return 401 if user is not found', (done) => {
        request(app)
          .post('/api/v1/auth/login')
          .set('x-locale', 'en')
          .send({
            email: "nonexistentuser@domain.com",
            password: "123456",
            expire: true
          })
          .expect(401)
          .end((err, res) => {
            expect(res.body).to.have.property('error');
            done();
          });
      })
      it('should return 401 if password is incorrect', (done) => {
        request(app)
          .post('/api/v1/auth/login')
          .set('x-locale', 'en')
          .send({
            email: testEmail,
            password: "wrongpassword",
            expire: true
          })
          .expect(401)
          .end((err, res) => {
            expect(res.body).to.have.property('error');
            done();
          });
      });
    })
})
