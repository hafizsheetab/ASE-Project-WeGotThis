const request = require('supertest');
const { expect } = require('chai');
const { SERVER, COMMON_HEADERS, genTestEmail, loginAndGetToken } = require('../helpers');

describe('Auth – GetSelf API End-to-End Tests', function() {
  this.timeout(15000);

  // test user credentials
  const testEmail    = genTestEmail('AuthGS');
  const testPassword = 'TestPass123!';
  let authToken;

  // register & login before running tests
  before(async () => {
    // register the test user
    await request(SERVER)
      .post('/api/v1/auth/register')
      .set(COMMON_HEADERS)
      .send({
        email:     testEmail,
        password:  testPassword,
        firstName: 'TestFirst',
        lastName:  'TestLast',
        expire:    true
      })
      .expect(200);

    // login to get token
    authToken = await loginAndGetToken(testEmail, testPassword);
  });

  /**
   * Auth.UserGS.01 – Successful fetch of own profile
   * GET /api/v1/user/getSelf with valid token should return 200 + user resource
   */
  it('Auth.UserGS.01 – GET /api/v1/user/getSelf – succeeds with valid token', async () => {
    const res = await request(SERVER)
      .get('/api/v1/user/getSelf')
      .set(COMMON_HEADERS)
      .set('x-auth-token', authToken);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('resource').that.is.an('object');
    const user = res.body.resource;
    expect(user).to.include({
      email: testEmail,
      firstName: 'TestFirst',
      lastName: 'TestLast'
    });
    expect(user).to.have.property('id');
  });

  /**
   * Auth.UserGS.02 – Missing x-auth-token
   * GET /api/v1/user/getSelf without token should return 401
   */
  it('Auth.UserGS.02 – GET /api/v1/user/getSelf – fails when token is missing', async () => {
    const res = await request(SERVER)
      .get('/api/v1/user/getSelf')
      .set(COMMON_HEADERS);

    expect(res.status).to.equal(401);
  });

  /**
   * Auth.UserGS.03 – Invalid x-auth-token
   * GET /api/v1/user/getSelf with invalid token should return 401
   */
  it('Auth.UserGS.03 – GET /api/v1/user/getSelf – fails when token is invalid', async () => {
    const res = await request(SERVER)
      .get('/api/v1/user/getSelf')
      .set(COMMON_HEADERS)
      .set('x-auth-token', 'invalid.token.here');

    expect(res.status).to.equal(401);
  });

  /**
   * Auth.UserGS.04 – Missing Accept header
   * GET /api/v1/user/getSelf without Accept should still return 200 (or 406 if enforced)
   */
  it('Auth.UserGS.04 – GET /api/v1/user/getSelf – succeeds without Accept header', async () => {
    const res = await request(SERVER)
      .get('/api/v1/user/getSelf')
      .set({
        'x-locale': COMMON_HEADERS['x-locale'],
        'x-auth-token': authToken
      })
      .unset('accept');

    expect([200, 406]).to.include(res.status);
    if (res.status === 200) {
      expect(res.body).to.have.property('resource');
    }
  });

  /**
 * Auth.UserGS.05 – Missing x-locale header
 * GET /api/v1/user/getSelf without x-locale should return 401 Unauthorized
 */
it('Auth.UserGS.05 – GET /api/v1/user/getSelf – fails without x-locale header', async () => {
    const res = await request(SERVER)
      .get('/api/v1/user/getSelf')
      .set({
        accept:        COMMON_HEADERS.accept,
        'x-auth-token': authToken
        // note: no x-locale
      });
  
    expect(res.status).to.equal(401);
  });
  

  /**
   * Auth.UserGS.06 – Expired token (optional)
   * GET /api/v1/user/getSelf with expired token should return 401
   */
  it('Auth.UserGS.06 – GET /api/v1/user/getSelf – fails with expired token', async () => {
    const expiredToken = '<your-expired-jwt-here>';
    const res = await request(SERVER)
      .get('/api/v1/user/getSelf')
      .set(COMMON_HEADERS)
      .set('x-auth-token', expiredToken);

    expect(res.status).to.equal(401);
  });
});
