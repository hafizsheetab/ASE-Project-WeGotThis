// backend/test/auth/login.test.js
const request = require('supertest');
const { expect } = require('chai');
const { SERVER, COMMON_HEADERS } = require('../helpers');

describe('Auth – Login API End-to-End Tests', function() {
  this.timeout(15000);

  /**
   * Auth.Lgn.01 – Successful login
   * POST /api/v1/auth/login with valid credentials should return 200 and a token payload
   */
  it('Auth.Lgn.01 – POST /api/v1/auth/login – succeeds with valid credentials', async () => {
    const payload = {
      email:    'sheetab@technohaven.com',
      password: '123456',
      expire:   true
    };

    const res = await request(SERVER)
      .post('/api/v1/auth/login')
      .set(COMMON_HEADERS)
      .send(payload);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('resource').that.is.an('object');

    const token = res.body.resource;
    expect(token).to.have.all.keys(
      'access_token',
      'token_type',
      'expires_in',
      'identifier'
    );
  });

  /**
   * Auth.Lgn.02 – Missing email
   * POST /api/v1/auth/login without email should return 401 Unauthorized
   */
  it('Auth.Lgn.02 – POST /api/v1/auth/login – fails when email is missing', async () => {
    const res = await request(SERVER)
      .post('/api/v1/auth/login')
      .set(COMMON_HEADERS)
      .send({
        password: '123456',
        expire:   true
      });

    expect(res.status).to.equal(401);
  });

  /**
   * Auth.Lgn.03 – Missing password
   * POST /api/v1/auth/login without password should return 401 Unauthorized
   */
  it('Auth.Lgn.03 – POST /api/v1/auth/login – fails when password is missing', async () => {
    const res = await request(SERVER)
      .post('/api/v1/auth/login')
      .set(COMMON_HEADERS)
      .send({
        email:  'sheetab@technohaven.com',
        expire: true
      });

    expect(res.status).to.equal(401);
  });

  /**
   * Auth.Lgn.04 – Invalid credentials
   * POST /api/v1/auth/login with wrong password should return 401 Unauthorized
   */
  it('Auth.Lgn.04 – POST /api/v1/auth/login – fails on wrong password', async () => {
    const res = await request(SERVER)
      .post('/api/v1/auth/login')
      .set(COMMON_HEADERS)
      .send({
        email:    'sheetab@technohaven.com',
        password: 'wrongpass',
        expire:   true
      });

    expect(res.status).to.equal(401);
  });

  /**
   * Auth.Lgn.05 – expire=false should still work
   * POST /api/v1/auth/login with expire=false should return 200 and a token
   */
  it('Auth.Lgn.05 – POST /api/v1/auth/login – succeeds with expire=false', async () => {
    const res = await request(SERVER)
      .post('/api/v1/auth/login')
      .set(COMMON_HEADERS)
      .send({
        email:    'sheetab@technohaven.com',
        password: '123456',
        expire:   false
      });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('resource').that.is.an('object');
  });

  /**
   * Auth.Lgn.06 – Response structure & security
   * The token object must include only the expected keys and no sensitive data
   */
  it('Auth.Lgn.06 – POST /api/v1/auth/login – response structure check', async () => {
    const res = await request(SERVER)
      .post('/api/v1/auth/login')
      .set(COMMON_HEADERS)
      .send({
        email:    'sheetab@technohaven.com',
        password: '123456',
        expire:   true
      })
      .expect(200);

    const token = res.body.resource;
    expect(Object.keys(token)).to.have.members([
      'access_token',
      'token_type',
      'expires_in',
      'identifier'
    ]);
    expect(token).to.not.have.property('password');
  });
});
