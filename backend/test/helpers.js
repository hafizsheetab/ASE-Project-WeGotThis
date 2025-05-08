const SERVER = process.env.SERVER_URL || 'http://localhost:8000';
const COMMON_HEADERS = {
    accept:        '*/*',
    'Content-Type':'application/json',
    'x-locale':    'en'
  };

  // Generate a unique email per test case
function genTestEmail(prefix = 'test') {
    return `${prefix}_${Date.now()}@test.com`;
  }
  
  // Simple random string generator
  function randomString(len = 10) {
    return [...Array(len)].map(() => Math.random().toString(36)[2]).join('');
  }
  
  // Login helper: returns an access token
  async function loginAndGetToken(email, password) {
    const res = await require('supertest')(SERVER)
      .post('/api/v1/auth/login')
      .set(COMMON_HEADERS)
      .send({ email, password, expire: true });
    if (res.status !== 200) throw new Error('Login failed');
    return res.body.resource.access_token;
  }
  
  module.exports = {
    SERVER,
    COMMON_HEADERS,
    genTestEmail,
    randomString,
    loginAndGetToken,
  };