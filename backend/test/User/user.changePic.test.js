const request = require('supertest');
const { expect } = require('chai');
const path = require('path');
const {
  SERVER,
  COMMON_HEADERS,
  FILES_HEADERS,
  genTestEmail,
  loginAndGetToken
} = require('../helpers');

const fixturesDir = path.join(__dirname, '../fixtures');
const avatarPath  = path.join(fixturesDir, 'avatar.png');
const dummyPath   = path.join(fixturesDir, 'dummy.txt');

describe('Auth – ChangePic API End-to-End Tests', function() {
  this.timeout(20000);

  const testEmail    = genTestEmail('AuthCP');
  const testPassword = 'TestPass123!';
  let authToken;

  before(async () => {
    // 1) Register test user
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

    // 2) Login → get JWT
    authToken = await loginAndGetToken(testEmail, testPassword);
  });


  it('Auth.UserCP.01 – PUT /api/v1/user/changePic – succeeds with valid image', async () => {
    const res = await request(SERVER)
      .put('/api/v1/user/changePic')
      .set('accept', '*/*')
      .set('x-locale', 'en')
      .set('x-auth-token', authToken )
      // correct field name `image`
      .attach('image', avatarPath);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('resource').that.is.an('object');
  });

  it('Auth.UserCP.02 – PUT /api/v1/user/changePic – fails without token', async () => {
    const res = await request(SERVER)
      .put('/api/v1/user/changePic')
      .set('accept', '*/*')
      .set('x-locale', 'en')    
      .attach('image', avatarPath);

    expect(res.status).to.equal(401);
  });

  it('Auth.UserCP.03 – PUT /api/v1/user/changePic – fails with invalid token', async () => {
    const res = await request(SERVER)
      .put('/api/v1/user/changePic')
      .set('accept', '*/*')
      .set('x-locale', 'en')
      .set('x-auth-token', 'invalid_token')
      .attach('image', avatarPath);

    expect(res.status).to.equal(401);
  });

});
