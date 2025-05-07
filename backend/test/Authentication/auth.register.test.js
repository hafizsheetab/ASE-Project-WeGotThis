// backend/test/auth/register.test.js
const request = require('supertest');
const { expect } = require('chai');
const { SERVER, COMMON_HEADERS, genTestEmail } = require('../helpers');

describe('Auth – Register API End-to-End Tests', function() {
  this.timeout(15000);

  // 1. Success
  /**
   * Auth.Reg.01 – Successful registration
   * POST /api/v1/auth/register with valid payload should return 200 and a token payload
   */
  it('Auth.Reg.01 – POST /api/v1/auth/register – succeeds with valid payload', async function() {
    const payload = {
      email:     genTestEmail('AuthReg01'),
      password:  '123456',
      firstName: 'TestFirst',
      lastName:  'TestLast',
      expire:    true
    };

    const res = await request(SERVER)
      .post('/api/v1/auth/register')
      .set(COMMON_HEADERS)
      .send(payload);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('resource').that.is.an('object');

    // register now returns a token payload, same as login
    const token = res.body.resource;
    expect(token).to.have.all.keys(
      'access_token',
      'token_type',
      'expires_in',
      'identifier'
    );
  });

  // 2. Missing email
  it('Auth.Reg.02 – POST /api/v1/auth/register – fails when email is missing', async function() {
    const { password, firstName, lastName, expire } = {
      password:  '123456',
      firstName: 'TestFirst',
      lastName:  'TestLast',
      expire:    true
    };
    const res = await request(SERVER)
      .post('/api/v1/auth/register')
      .set(COMMON_HEADERS)
      .send({ password, firstName, lastName, expire });

    expect(res.status).to.equal(401);
  });

  // 3. Missing password
  it('Auth.Reg.03 – POST /api/v1/auth/register – fails when password is missing', async function() {
    const { email, firstName, lastName, expire } = {
      email:     genTestEmail('AuthReg03'),
      firstName: 'TestFirst',
      lastName:  'TestLast',
      expire:    true
    };
    const res = await request(SERVER)
      .post('/api/v1/auth/register')
      .set(COMMON_HEADERS)
      .send({ email, firstName, lastName, expire });

    expect(res.status).to.equal(401);
  });

  // 4. Missing firstName
  it('Auth.Reg.04 – POST /api/v1/auth/register – fails when firstName is missing', async function() {
    const { email, password, lastName, expire } = {
      email:     genTestEmail('AuthReg04'),
      password:  '123456',
      lastName:  'TestLast',
      expire:    true
    };
    const res = await request(SERVER)
      .post('/api/v1/auth/register')
      .set(COMMON_HEADERS)
      .send({ email, password, lastName, expire });

    expect(res.status).to.equal(401);
  });

  // 5. Missing lastName
  it('Auth.Reg.05 – POST /api/v1/auth/register – fails when lastName is missing', async function() {
    const { email, password, firstName, expire } = {
      email:     genTestEmail('AuthReg05'),
      password:  '123456',
      firstName: 'TestFirst',
      expire:    true
    };
    const res = await request(SERVER)
      .post('/api/v1/auth/register')
      .set(COMMON_HEADERS)
      .send({ email, password, firstName, expire });

    expect(res.status).to.equal(401);
  });

  // 6. Missing expire
  it('Auth.Reg.06 – POST /api/v1/auth/register – fails when expire flag is missing', async function() {
    const { email, password, firstName, lastName } = {
      email:     genTestEmail('AuthReg06'),
      password:  '123456',
      firstName: 'TestFirst',
      lastName:  'TestLast'
    };
    const res = await request(SERVER)
      .post('/api/v1/auth/register')
      .set(COMMON_HEADERS)
      .send({ email, password, firstName, lastName });

    expect(res.status).to.equal(401);
  });

  // 7. Invalid email format
  it('Auth.Reg.07 – POST /api/v1/auth/register – fails on invalid email format', async function() {
    const res = await request(SERVER)
      .post('/api/v1/auth/register')
      .set(COMMON_HEADERS)
      .send({
        email:     'not-an-email',
        password:  '123456',
        firstName: 'TestFirst',
        lastName:  'TestLast',
        expire:    true
      });

    expect(res.status).to.equal(401);
  });

  // 8. Non-boolean expire
  it('Auth.Reg.08 – POST /api/v1/auth/register – fails when expire is non-boolean', async function() {
    const res = await request(SERVER)
      .post('/api/v1/auth/register')
      .set(COMMON_HEADERS)
      .send({
        email:     genTestEmail('AuthReg08'),
        password:  '123456',
        firstName: 'TestFirst',
        lastName:  'TestLast',
        expire:    'true'
      });

    expect(res.status).to.equal(401);
  });

  // 9. Duplicate email
  it('Auth.Reg.09 – POST /api/v1/auth/register – rejects duplicate email', async function() {
    const testEmail = genTestEmail('AuthReg09');
    // first registration
    await request(SERVER)
      .post('/api/v1/auth/register')
      .set(COMMON_HEADERS)
      .send({
        email:     testEmail,
        password:  '123456',
        firstName: 'TestFirst',
        lastName:  'TestLast',
        expire:    true
      })
      .expect(200);

    // duplicate
    const res = await request(SERVER)
      .post('/api/v1/auth/register')
      .set(COMMON_HEADERS)
      .send({
        email:     testEmail,
        password:  '123456',
        firstName: 'TestFirst',
        lastName:  'TestLast',
        expire:    true
      });

    expect(res.status).to.equal(401);
  });

 /**
   * Auth.Reg.10 – Very long firstName
   * POST /api/v1/auth/register with a 300-char firstName should return 200, 400 or 401
   */
 it('Auth.Reg.10 – POST /api/v1/auth/register – handles very long firstName gracefully', async function() {
  const longName = 'a'.repeat(300);
  const res = await request(SERVER)
    .post('/api/v1/auth/register')
    .set(COMMON_HEADERS)
    .send({
      email:     genTestEmail('AuthReg10'),
      password:  '123456',
      firstName: longName,
      lastName:  'TestLast',
      expire:    true
    });

  // Accept success, validation error, or unauthorized
  expect([200, 400, 401]).to.include(res.status);
});

  // 11. expire=false still succeeds
  it('Auth.Reg.11 – POST /api/v1/auth/register – expire=false still succeeds', async function() {
    const res = await request(SERVER)
      .post('/api/v1/auth/register')
      .set(COMMON_HEADERS)
      .send({
        email:     genTestEmail('AuthReg11'),
        password:  '123456',
        firstName: 'TestFirst',
        lastName:  'TestLast',
        expire:    false
      });

    expect(res.status).to.equal(200);
    expect(res.body.resource).to.be.an('object');
  });

  it('Auth.Reg.12 – POST /api/v1/auth/register – response token structure check', async function() {
    const res = await request(SERVER)
      .post('/api/v1/auth/register')
      .set(COMMON_HEADERS)
      .send({
        email:     genTestEmail('AuthReg12'),
        password:  '123456',
        firstName: 'TestFirst',
        lastName:  'TestLast',
        expire:    true
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
