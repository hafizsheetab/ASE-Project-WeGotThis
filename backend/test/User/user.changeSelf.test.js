const request = require('supertest');
const { expect } = require('chai');
const { SERVER, COMMON_HEADERS, genTestEmail, loginAndGetToken } = require('../helpers');

describe('User – ChangeSelf API End-to-End Tests', function() {
  this.timeout(15000);

  // test user credentials
  const testEmail    = genTestEmail('UserCS');
  const testPassword = 'TestPass123!';
  let authToken;

  // fields required by the endpoint
  const requiredFields = {
    expire:      true,
    password:    testPassword,
    phoneNumber: '1234567890',
    location:    'Zurich',
    categoryIds: []
  };

  // register & login before running tests
    before(async () => {
      // register the test user
      const res = await request(SERVER)
          .post('/api/v1/auth/register')
          .set(COMMON_HEADERS)
          .send({
            email:testEmail,
            password:  testPassword,
            firstName: 'TestFirst',
            lastName:  'TestLast',
            expire:    true})
        // .expect(200);
        console.log(res.status, res.body);  
  
      // login to get token
      authToken = await loginAndGetToken(testEmail, testPassword);
    });

  /**
   * User.UserCS.01 – succeeds updating both names
   */
  it('User.UserCS.01 – PUT /api/v1/user/changeSelf – succeeds updating both names', async () => {
    const res = await request(SERVER)
      .put('/api/v1/user/changeSelf')
      .set(COMMON_HEADERS)
      .set('x-auth-token', authToken)
      .send({
        firstName: 'NewFirst',
        lastName:  'NewLast',
        ...requiredFields
      })
      // .expect(200);
      console.log(res.status, res.body);  

    expect(res.body).to.have.property('resource').that.is.an('object');
    const u = res.body.resource;
    expect(u).to.include({
      email:     testEmail,
      firstName: 'NewFirst',
      lastName:  'NewLast'
    });
    expect(u).to.have.property('id');
    expect(u).to.not.have.property('password');
  });

  /**
   * User.UserCS.02 – fails without token
   */
  it('User.UserCS.02 – PUT /api/v1/user/changeSelf – fails without token', async () => {
    const res = await request(SERVER)
      .put('/api/v1/user/changeSelf')
      .set(COMMON_HEADERS)
      .send({
        firstName: 'X',
        lastName:  'Y',
        ...requiredFields
      });

    expect(res.status).to.equal(401);
  });

  /**
   * User.UserCS.03 – fails with invalid token
   */
  it('User.UserCS.03 – PUT /api/v1/user/changeSelf – fails with invalid token', async () => {
    const res = await request(SERVER)
      .put('/api/v1/user/changeSelf')
      .set(COMMON_HEADERS)
      .set('x-auth-token', 'invalid.token.here')
      .send({
        firstName: 'X',
        lastName:  'Y',
        ...requiredFields
      });

    expect(res.status).to.equal(401);
  });

  /**
   * User.UserCS.04 – fails when no fields provided
   */
  it('User.UserCS.04 – PUT /api/v1/user/changeSelf – fails when no fields provided', async () => {
    const res = await request(SERVER)
      .put('/api/v1/user/changeSelf')
      .set(COMMON_HEADERS)
      .set('x-auth-token', authToken)
      .send({});

    expect(res.status).to.equal(400);
  });

  /**
   * User.UserCS.05 – succeeds updating only firstName
   */
  it('User.UserCS.05 – PUT /api/v1/user/changeSelf – succeeds updating only firstName', async () => {
    const res = await request(SERVER)
      .put('/api/v1/user/changeSelf')
      .set(COMMON_HEADERS)
      .set('x-auth-token', authToken)
      .send({
        firstName: 'OnlyFirst',
        lastName:  'TestLast',  // keep original lastName
        ...requiredFields
      })
      .expect(200);

    const u = res.body.resource;
    expect(u.firstName).to.equal('OnlyFirst');
    expect(u.lastName).to.equal('TestLast');
  });

  /**
   * User.UserCS.06 – fails on invalid field type
   */
  it('User.UserCS.06 – PUT /api/v1/user/changeSelf – fails on invalid field type', async () => {
    const res = await request(SERVER)
      .put('/api/v1/user/changeSelf')
      .set(COMMON_HEADERS)
      .set('x-auth-token', authToken)
      .send({
        firstName: 1234,  // invalid type
        lastName:  'Last',
        ...requiredFields
      });

    expect(res.status).to.equal(400);
  });

  /**
   * User.UserCS.07 – response structure & security check
   */
  it('User.UserCS.07 – PUT /api/v1/user/changeSelf – response structure & security check', async () => {
    const res = await request(SERVER)
      .put('/api/v1/user/changeSelf')
      .set(COMMON_HEADERS)
      .set('x-auth-token', authToken)
      .send({
        firstName: 'FinalFirst',
        lastName:  'FinalLast',
        ...requiredFields
      })
      .expect(200);

    const u = res.body.resource;
    expect(Object.keys(u)).to.have.members([
      'id', 'email', 'firstName', 'lastName', 'createdAt', 'updatedAt'
    ]);
    expect(u).to.not.have.property('password');
  });
});
