const {step} = require('mocha-steps')
const axios = require('axios');
const { expect } = require('chai');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');
const { user } = require('../Types/EntityNames');
const { de } = require('../messages/formErrorMessages');
const e = require('express');

const headers = {
  'Content-Type': 'application/json',
  'Accept':       'application/json',
  "x-locale": "en",
  "x-auth-token": ""
}
// Write a random email generator function
const randomEmail = () => {
  const timestamp = Date.now();
  return `test${timestamp}@example.com`;
}
const testAuthFailure = async ({ method, url, payload = {}, token, locale, expectedErrorCode }) => {
  const customHeaders = {
    'Content-Type': 'application/json',
    ...(locale !== false && { 'x-locale': locale || 'en' }),
    ...(token !== false && { 'x-auth-token': token }),
  };

  try {
    if (method === 'GET') {
      await axios.get(url, { headers: customHeaders });
    } else if (method === 'POST') {
      await axios.post(url, payload, { headers: customHeaders });
    } else if (method === 'PUT') {
      await axios.put(url, payload, { headers: customHeaders });
    } else if (method === 'DELETE') {
      await axios.delete(url, { headers: customHeaders });
    }

    throw new Error('Request should have failed but succeeded');
  } catch (err) {
    expect(err.response.status).to.equal(401);
  }
};

describe('User API tests', () => {
  let offerId11,offerId12,offerId21;
  let userId1,userId2;
  let token1,token2;
  let email1,email2;
  describe('register API test', () => {
  step('register User1', async () => {
    email1 = randomEmail();
    const payload = {
      email:    email1,
      password: 'password123',
      firstName: 'User1',
      lastName:  'User1',
      expire: true,      
    };
    const response = await axios.post('http://localhost:8000/api/v1/auth/register', payload, { headers });
    expect(response.status).to.equal(200);
    token1 = response.data.resource.access_token;
    userId1 = response.data.resource.id;
    headers["x-auth-token"] = response.data.resource.access_token;
  })
  step('register User2', async () => {
    email2 = randomEmail();
    const payload = {
      email:    email2,
      password: 'password123',
      firstName: 'User2',
      lastName:  'User2',
      expire: true,
    };
    const response = await axios.post('http://localhost:8000/api/v1/auth/register', payload, { headers });
    token2 = response.data.resource.access_token;
    userId2 = response.data.resource.id;
  })
  step('registering with existing email should return 401', async () => {
      const payload = {
        email:    email1,
        password: 'password123',
        expire: true,
        firstName: 'User1',
        lastName:  'User1',
      };
      try{
      const response = await axios.post('http://localhost:8000/api/v1/auth/register', payload, { headers });
      }catch(error){
        expect(error.response.status).to.equal(401);
      }
  })
  step('registering without email should return 401', async () => {
    const payload = {
      password: 'password123',
      expire: true,
      firstName: 'User1',
      lastName:  'User1',
    };
    try{
        const response = await axios.post('http://localhost:8000/api/v1/auth/register', payload, { headers });
    }catch(error){
        expect(error.response.status).to.equal(401);
    }
  })
  })
  describe('login API test', () => {
    step('login successfully', async () => {
      headers["x-auth-token"] = token2;
      const payload = {
        email:   email1, 
        password: 'password123',
        expire: true,
      };
      const response = await axios.post('http://localhost:8000/api/v1/auth/login', payload, { headers });
      expect(response.status).to.equal(200);
      })
    step('login with wrong password should return 401', async () => {
      const payload = {
        email:   email1, 
        password: 'wrongpassword',
        expire: true,
      };
      try{
      const response = await axios.post('http://localhost:8000/api/v1/auth/login', payload, { headers });
      }catch(error){
        expect(error.response.status).to.equal(401);
      }
    })
  })
  describe('getSelf API test',() => {
    step('getSelf successfully', async () => {
      const response = await axios.get('http://localhost:8000/api/v1/user/getSelf', { headers });
      expect(response.status).to.equal(200);
      expect(response.data).to.have.property('resource').that.is.an('object');
      expect(response.data.resource).to.have.property('email').that.is.a('string');
      })
    step('getSelf without token should return 401', async () => {
      await testAuthFailure({
        method: 'GET',
        url: `http://localhost:8000/api/v1/user/getSelf`,
        token: false, 
        expectedErrorCode: 'general.missingHeader'
    }) 
    })
  })
  describe('changeSelf API tests',() => {
    step('changeSelf successfully', async () => {
      const payload = {
        firstName: 'Jane',
        lastName:  'Doe',
        expire: true,
        password: 'password123',
        location: 'Zurich',
        categoryIds:[1]
      };
      const response = await axios.put('http://localhost:8000/api/v1/user/changeSelf', payload, { headers });
      expect(response.status).to.equal(200);
      expect(response.data).to.have.property('resource').that.is.an('object');
      expect(response.data.resource).to.have.property('email').that.is.a('string');
    })
    step('getSelf without token should return 401', async () => {
      await testAuthFailure({
        method: 'PUT',
        url: `http://localhost:8000/api/v1/user/changeSelf`,
        token: false, 
        expectedErrorCode: 'general.missingHeader'
    })
    })
  })
})

describe('Offer-Creation API Tests', () => {
  let offerId11,offerId12,offerId21;
  let userId1,userId2;
  let token1,token2;
  eamil1 = randomEmail();
  step('register User1', async () => {
    const payload = {
      email:    eamil1,
      password: 'password123',
      expire: true,
      firstName: 'User1',
      lastName:  'User1',
    };
    const response = await axios.post('http://localhost:8000/api/v1/auth/register', payload, { headers });
    expect(response.status).to.equal(200);
    token1 = response.data.resource.access_token;
    userId1 = response.data.resource.id;
    headers["x-auth-token"] = response.data.resource.access_token;
  })
  step('register User2', async () => {
    const payload = {
      email:    randomEmail(),
      password: 'password123',
      expire: true,
      firstName: 'User2',
      lastName:  'User2',
    };
    const response = await axios.post('http://localhost:8000/api/v1/auth/register', payload, { headers });
    token2 = response.data.resource.access_token;
    userId2 = response.data.resource.id;
  })
  describe('createOffer API test', () => {
    step('createOffer1', async () => {
    const payload = {
      title: 'Dog Walking Service',
      description: 'I can walk your dog for 30 minutes.',
      location: 'New York, NY',
      priceModeId: 1,
      price:20,
      availability:true,
      typeId:1,
      categoryIds:[1],
      startTime:1743210637,
      endTime:1743214237
    };
    const response = await axios.post('http://localhost:8000/api/v1/offer/create', payload, { headers });
    expect(response.status).to.equal(200);
    offerId11 = response.data.resource.id;
    userId1 = response.data.resource.userId;
  })
  step('createOffer2', async () => {
    const payload = {
      title: 'Dog Walking Service',
      description: 'I can walk your dog for 30 minutes.',
      location: 'New York, NY',
      priceModeId: 1,
      price:20,
      availability:true,
      typeId:1,
      categoryIds:[1],
      startTime:1743210637,
      endTime:1743214237
    };
    const response = await axios.post('http://localhost:8000/api/v1/offer/create', payload, { headers });
    offerId12 = response.data.resource.id;
  })
  step('createOffer3', async () => {
    const payload = {
      title: 'Dog Walking Service3',
      description: 'I can walk your dog for 30 minutes.',
      location: 'New York, NY',
      priceModeId: 1,
      price:20,
      availability:true,
      typeId:1,
      categoryIds:[1],
      startTime:1743210637,
      endTime:1743214237
    };
    headers["x-auth-token"] = token2;
    const response = await axios.post('http://localhost:8000/api/v1/offer/create', payload, { headers });
    offerId21 = response.data.resource.id;
  })
  step('missing title should return 401', async () => {
      const payload = {
        description: 'I can walk your dog for 30 minutes.',
        location: 'New York, NY',
        priceModeId: 1,
        price:20,
        availability:true,
        typeId:1,
        categoryIds:[1],
        startTime:1743210637,
        endTime:1743214237
      };
      try{
      const response = await axios.post('http://localhost:8000/api/v1/offer/create', payload, { headers });
      }catch(error){
        expect(error.response.status).to.equal(401);
      }
  })
  step('missing token should return 401', async () => {
    const payload = {
      title: 'Dog Walking Service3',
      description: 'I can walk your dog for 30 minutes.',
      location: 'New York, NY',
      priceModeId: 1,
      price:20,
      availability:true,
      typeId:1,
      categoryIds:[1],
      startTime:1743210637,
      endTime:1743214237
    };
  await testAuthFailure({
    method: 'POST',
    url: `http://localhost:8000/api/v1/offer/create`,
    payload,
    token: false, 
    expectedErrorCode: 'general.missingHeader'
  });
});
  
  })
  describe('editOffer API test', () => {
    const payload={
      title: 'Dog Walking Service',
      description: 'I can walk your dog for 30 minutes.',
      location: 'New York, NY',
      priceModeId: 1,
      price:20,
      availability:true,
      typeId:1,
      categoryIds:[1],
      startTime:1743210637,
      endTime:1743214237
    }
    step('edit offer successfully', async () => {
    headers["x-auth-token"] = token1;
    const response = await axios.put(`http://localhost:8000/api/v1/offer/edit/${offerId11}`, payload, { headers });
    expect(response.status).to.equal(200);
    expect(response.data).to.have.property('resource').that.is.an('object');
    expect(response.data.resource).to.have.property('id').that.is.a('string');
  })
    step('fail to edit offer with wrong user should return 401', async () => {
      headers['x-auth-token'] = token2;  

      try {
      await axios.put(`http://localhost:8000/api/v1/offer/edit/${offerId11}`, { title: 'Malicious Edit' }, { headers });
      throw new Error('Expected unauthorized error, but succeeded');
        } catch (err) {
      expect(err.response.status).to.equal(401);
        }
        }); 
    headers['x-auth-token'] = token1;
    step('without token should return 401', async () => {
      await testAuthFailure({
        method: 'PUT',
        url: `http://localhost:8000/api/v1/offer/edit/${offerId11}`,
        payload,
        token: false, 
        expectedErrorCode: 'general.missingHeader'
    })
      })
    })
  describe('getOffer API test', () => {
    step('getOffer successfully', async () => {
      headers["x-auth-token"] = token1;
      const response = await axios.get(`http://localhost:8000/api/v1/offer/get/${offerId11}`, { headers });
      expect(response.status).to.equal(200);
      expect(response.data).to.have.property('resource').that.is.an('object');
      expect(response.data.resource).to.have.property('id').that.is.a('string');
    })
    step('without token should return 401', async () => {
      await testAuthFailure({
        method: 'GET',
        url: `http://localhost:8000/api/v1/offer/get/${offerId11}`,
        token: false, 
        expectedErrorCode: 'general.missingHeader'
    })
    })
  })
  describe('getOffers API test', () => {
    step('getOffers successfully', async () => {
      headers["x-auth-token"] = token1;
      const response = await axios.get('http://localhost:8000/api/v1/offer/getAll', { headers });
      expect(response.status).to.equal(200);
      expect(response.data).to.have.property('resource').that.is.an('array');
      expect(response.data.resource[0]).to.have.property('id').that.is.a('string');
    })
    step('without token should return 401', async () => {
      await testAuthFailure({
        method: 'GET',
        url: `http://localhost:8000/api/v1/offer/getAll`,
        token: false, 
        expectedErrorCode: 'general.missingHeader'
    })
    })
  })
  describe('deleteOffer API test', () => {
    step('deleteOffer successfully', async () => {
      headers["x-auth-token"] = token1;
      const response = await axios.delete(`http://localhost:8000/api/v1/offer/delete/${offerId11}`, { headers });
      expect(response.status).to.equal(200);
      })
    step('without token should return 401', async () => {
      await testAuthFailure({
        method: 'DELETE',
        url: `http://localhost:8000/api/v1/offer/delete/${offerId11}`,
        token: false, 
        expectedErrorCode: 'general.missingHeader'
      })
    })
  })
  describe('template API test', () => {
    step('template successfully', async () => {
      const response = await axios.get(`http://localhost:8000/api/v1/offer/template`, { headers });
      expect(response.status).to.equal(200);
      expect(response.data).to.have.property('resource').that.is.an('object');
    })
    step('without token should return 401', async () => {
      await testAuthFailure({
        method: 'GET',
        url: `http://localhost:8000/api/v1/offer/template`,
        token: false, 
        expectedErrorCode: 'general.missingHeader'
      })
    })
  })
})
describe('Offer-Booking system && User API tests', () => {
  let emailA,emailB;
  let tokenA,tokenB;
  let offerA1,offerA2,offerA3;
  let userAId,userBId;
  let request1Id,request2Id,request3Id;
  step('register', async () => {
    emailA = randomEmail();
    const payload = {
      email:    emailA,
      password: 'password123',
      expire: true,
      firstName: 'UserA',
      lastName:  'UserA',
    };
    const response = await axios.post('http://localhost:8000/api/v1/auth/register', payload, { headers });
    expect(response.status).to.equal(200);
    tokenA = response.data.resource.access_token;
    userAId = response.data.resource.identifier;
    headers["x-auth-token"] = response.data.resource.access_token;
  })
  step('register', async () => {
    emailB = randomEmail();
    const payload = {
      email:    emailB,
      password: 'password123',
      expire: true,
      firstName: 'UserB',
      lastName:  'UserB',
    };
    const response = await axios.post('http://localhost:8000/api/v1/auth/register', payload, { headers });
    tokenB = response.data.resource.access_token;
    userBId = response.data.resource.identifier;
  })
  step('createOffer', async () => {
    const payload = {
      title: 'Dog Walking Service-A1',
      description: 'I can walk your dog for 30 minutes.',
      location: 'New York, NY',
      priceModeId: 1,
      price:20,
      availability:true,
      typeId:1,
      categoryIds:[1],
      startTime:1743210637,
      endTime:1743214237
    };
    const response = await axios.post('http://localhost:8000/api/v1/offer/create', payload, { headers });
    expect(response.status).to.equal(200);
    offerA1 = response.data.resource.id;
  })
  step('createOffer', async () => {
    const payload = {
      title: 'Dog Walking Service-A2',
      description: 'I can walk your dog for 30 minutes.',
      location: 'New York, NY',
      priceModeId: 1,
      price:20,
      availability:true,
      typeId:1,
      categoryIds:[1],
      startTime:1743210637,
      endTime:1743214237
    };
    const response = await axios.post('http://localhost:8000/api/v1/offer/create', payload, { headers });
    expect(response.status).to.equal(200);
    offerA2 = response.data.resource.id;
  })
  step('createOffer', async () => {
    const payload = {
      title: 'Dog Walking Service-A3',
      description: 'I can walk your dog for 30 minutes.',
      location: 'New York, NY',
      priceModeId: 1,
      price:20,
      availability:true,
      typeId:1,
      categoryIds:[1],
      startTime:1743210637,
      endTime:1743214237
    };
    const response = await axios.post('http://localhost:8000/api/v1/offer/create', payload, { headers });
    expect(response.status).to.equal(200);
    offerA3 = response.data.resource.id;
  })
  describe('addRequests API test', () => {
    // UserB requests to UserA's offer 
    step('addRequests1 successfully', async () => {
      headers["x-auth-token"] = tokenB;
      const response = await axios.put(`http://localhost:8000/api/v1/offer/add/requests/${offerA1}`, {},{ headers });
      expect(response.status).to.equal(200);
      expect(response.data).to.have.property('resource').that.is.an('object');
      request1Id = response.data.resource.requests[0].id;
    })
    step('addRequests2 successfully', async () => {
      headers["x-auth-token"] = tokenB;
      const response = await axios.put(`http://localhost:8000/api/v1/offer/add/requests/${offerA2}`, {},{ headers });
      expect(response.status).to.equal(200);
      expect(response.data).to.have.property('resource').that.is.an('object');
      request2Id = response.data.resource.requests[0].id;
    })
    step('addRequests3 successfully', async () => {
      headers["x-auth-token"] = tokenB;
      const response = await axios.put(`http://localhost:8000/api/v1/offer/add/requests/${offerA3}`, {},{ headers });
      expect(response.status).to.equal(200);
      expect(response.data).to.have.property('resource').that.is.an('object');
      request3Id = response.data.resource.requests[0].id;
    })
    step('fail to request own offer should return 401', async () => {
    headers["x-auth-token"] = tokenA;

    try {
      await axios.put(`http://localhost:8000/api/v1/offer/add/requests/${offerA1}`, {}, { headers });
      throw new Error('Should not allow request to own offer');
    } catch (err) {
      expect(err.response.status).to.equal(401);
    }
    });
    step('without token should return 401', async () => {
      await testAuthFailure({
        method: 'PUT',
        url: `http://localhost:8000/api/v1/offer/add/requests/${offerA1}`,
        token: false, 
        expectedErrorCode: 'general.missingHeader'
    })
    })
  });

  describe('withdrawRequest API test', () => {
    step('withdraw Request successfully', async () => {
      headers["x-auth-token"] = tokenB;  
      const response = await axios.put(`http://localhost:8000/api/v1/offer/withdraw/${offerA3}/${request3Id}`, {}, { headers });
      expect(response.status).to.equal(200);
      expect(response.data).to.have.property('resource').that.is.an('object');
    })
    step('fail to withdrawRequest with invalid requestId should return 401', async () => {
      headers["x-auth-token"] = tokenB;
      try {
      await axios.put(`http://localhost:8000/api/v1/offer/withdraw/${offerA3}/nonexistentUserId`, {}, { headers });
      throw new Error('Should fail with invalid requestId');
        } catch (err) {
      expect(err.response.status).to.equal(401);
  }
    });
    step('without token should return 401', async () => {
      await testAuthFailure({
        method: 'PUT',
        url: `http://localhost:8000/api/v1/offer/withdraw/${offerA3}/${request3Id}`,
        token: false, 
        expectedErrorCode: 'general.missingHeader'
    })
    })
  })  
  describe('acceptOffer API test', () => {
    // UserA accepts UserB's request
  step('login successfully', async () => {
    const payload = {
      email:   emailA, 
      password: 'password123',
      expire: true,

    };
    const response = await axios.post('http://localhost:8000/api/v1/auth/login', payload, { headers });
    expect(response.status).to.equal(200);
    tokenA = response.data.resource.access_token;
    headers["x-auth-token"] = tokenA;
  })
  step('acceptOffer successfully', async () => {
    const response = await axios.put(`http://localhost:8000/api/v1/offer/accept/${offerA1}/${request1Id}`, {}, { headers });
    expect(response.status).to.equal(200);
    expect(response.data).to.have.property('resource').that.is.an('object');
    expect(response.data.resource.requests[0].statusId).to.equal(3); //  OfferStatusEnum.ACCEPTED.id 
  })
  step('fail to accept offer by non-owner user should return 401', async () => {
    headers['x-auth-token'] = tokenB; 
    try {
      await axios.put(`http://localhost:8000/api/v1/offer/accept/${offerA1}/${request1Id}`, {}, { headers });
      throw new Error('Should not allow non-owner to accept offer');
    } catch (err) {
      expect(err.response.status).to.equal(401);
    }
});
})

  describe('rejectOffer API test', () => {
    // UserA rejects UserB's request
  step('rejectOffer successfully', async () => {
    headers["x-auth-token"] = tokenA;
    const response = await axios.put(`http://localhost:8000/api/v1/offer/reject/${offerA2}/${request2Id}`, {}, { headers });
    expect(response.status).to.equal(200);
    expect(response.data).to.have.property('resource').that.is.an('object');
    expect(response.data.resource.requests[0].statusId).to.equal(2); //  OfferStatusEnum.REJECTED.id
  })
  step('fail to reject offer by non-owner should return 401', async () => {
    headers['x-auth-token'] = tokenB; 

    try {
      await axios.put(
        `http://localhost:8000/api/v1/offer/reject/${offerA2}/${request2Id}`,
        {},
        { headers }
      );
      throw new Error('Should not allow non-owner to reject offer');
    } catch (err) {
      expect(err.response.status).to.equal(401);
    }
});

  })
  describe('giveReview API test', () => {
    step('login', async () => {
    const payload = {
      email:   emailB, 
      password: 'password123',
      expire: true,
    };
    const response = await axios.post('http://localhost:8000/api/v1/auth/login', payload, { headers });
    expect(response.status).to.equal(200);
    tokenB = response.data.resource.access_token;
    headers["x-auth-token"] = tokenB;
  })
  step('giveReview successfully', async () => {
    const payload = {
      rating: 5,
      text: 'Great service!',
    };
    const response = await axios.put(`http://localhost:8000/api/v1/offer/giveReview/${offerA1}/${request1Id}`, payload,{ headers });
    expect(response.status).to.equal(200);
  })
  step('fail to giveReview with invalid requestId should return 401', async () => {
    try {
      const payload = {
        rating: 5,
        text: 'Great service!',
      };
      await axios.put(`http://localhost:8000/api/v1/offer/giveReview/${offerA1}/nonexistentRequestId`, payload, { headers });
      throw new Error('Should fail with invalid requestId');
    } catch (err) {
      expect(err.response.status).to.equal(401);
    }
  })
})
  describe('completeOffer API test', () => {
    step('job seeker complete Offer successfully', async () => {
    const response = await axios.put(`http://localhost:8000/api/v1/offer/complete/${offerA1}/${request1Id}`, {}, { headers });
    expect(response.status).to.equal(200);
    expect(response.data).to.have.property('resource').that.is.an('object');
    })
    step('login', async () => {
      const payload = {
        email:   emailA, 
        password: 'password123',
        expire: true,
      };
      const response = await axios.post('http://localhost:8000/api/v1/auth/login', payload, { headers });
      expect(response.status).to.equal(200);
      tokenA = response.data.resource.access_token;
      headers["x-auth-token"] = tokenA;
    })
    step('job provider complete Offer successsfully, the status of request is complete', async () => {
      const response = await axios.put(`http://localhost:8000/api/v1/offer/complete/${offerA1}/${request1Id}`, {}, { headers });
      expect(response.status).to.equal(200);
      expect(response.data).to.have.property('resource').that.is.an('object');
      expect(response.data.resource.requests[0].statusId).to.equal(4);
    })
    step('fail to completeOffer before accept should return 401', async () => {
      headers['x-auth-token'] = tokenB;
      try {
        await axios.put(`http://localhost:8000/api/v1/offer/complete/${offerA2}/${request2Id}`, {}, { headers });
        throw new Error('Should not allow completing unaccepted offer');
      } catch (err) {
        expect(err.response.status).to.equal(401);
      }
  });

  })

  describe('myOffers API test}', () => {
    headers["x-auth-token"] = tokenA;
    step('myOffers successfully', async () => {
      const response = await axios.get(`http://localhost:8000/api/v1/offer/my/Offers`, { headers });
      expect(response.status).to.equal(200);
      expect(response.data).to.have.property('resource').that.is.an('array');
    })
    step('without token should return 401', async () => {
      await testAuthFailure({
        method: 'GET',
        url: `http://localhost:8000/api/v1/offer/my/Offers`,
        token: false, 
        expectedErrorCode: 'general.missingHeader'
    })
    })
  })
  describe('getMyRequestsToOffers API test', () => {
    step('getMyRequestsToOffers successfully', async () => {
      const response = await axios.get(`http://localhost:8000/api/v1/offer/getMyRequestsToOffer`, { headers });
      expect(response.status).to.equal(200);
      expect(response.data).to.have.property('resource').that.is.an('array');
    })
    step('without token should return 401', async () => {
      await testAuthFailure({
        method: 'GET',
        url: `http://localhost:8000/api/v1/offer/getMyRequestsToOffer`,
        token: false, 
        expectedErrorCode: 'general.missingHeader'
    })
    })
  })
  describe('getRequestsOnMyOffers API test', () => {
    step('getRequestsOnMyOffers successfully', async () => {
      const response = await axios.get(`http://localhost:8000/api/v1/offer/getRequestsOnMyOffers`, { headers });
      expect(response.status).to.equal(200);
      expect(response.data).to.have.property('resource').that.is.an('array');
    })
    step('without token should return 401', async () => {
      await testAuthFailure({
        method: 'GET',
        url: `http://localhost:8000/api/v1/offer/getRequestsOnMyOffers`,
        token: false, 
        expectedErrorCode: 'general.missingHeader'
    })
    })
})
  describe('getAllRequests API test', () => {
    step('getAllRequests successfully', async () => {
      const response = await axios.get(`http://localhost:8000/api/v1/offer/getAll/requests`, { headers });
      expect(response.status).to.equal(200);
      expect(response.data).to.have.property('resource').that.is.an('array');
    })
    step('without token should return 401', async () => {
      await testAuthFailure({
        method: 'GET',
        url: `http://localhost:8000/api/v1/offer/getAll/requests`,
        token: false, 
        expectedErrorCode: 'general.missingHeader'
    })
    })
  }
)
 describe('User - getReviews API tests',() => {
  step('getReviews successfully', async () => {
    const response = await axios.get(`http://localhost:8000/api/v1/user/getReviews/${userAId}`, { headers });
    expect(response.status).to.equal(200);
  })
  step('without token should return 401', async () => {
    await testAuthFailure({
      method: 'GET',
      url: `http://localhost:8000/api/v1/user/getReviews/${userAId}`,
      token: false, 
      expectedErrorCode: 'general.missingHeader'
  })
  })
  })
})

describe('Image upload API tests', () => {
  let token,offerId,userId;
  step('data preparation--register', async () => {
    const payload = {
      email:    randomEmail(),
      password: 'password123',
      expire: true,
      firstName: 'User1',
      lastName:  'User1',
    };
    const response = await axios.post('http://localhost:8000/api/v1/auth/register', payload, { headers });
    expect(response.status).to.equal(200);
    token = response.data.resource.access_token;
    headers["x-auth-token"] = response.data.resource.access_token;
  })
  step('data preparation--createOffer1', async () => {
    const payload = {
      title: 'Dog Walking Service',
      description: 'I can walk your dog for 30 minutes.',
      location: 'New York, NY',
      priceModeId: 1,
      price:20,
      availability:true,
      typeId:1,
      categoryIds:[1],
      startTime:1743210637,
      endTime:1743214237
    };
    const response = await axios.post('http://localhost:8000/api/v1/offer/create', payload, { headers });
    expect(response.status).to.equal(200);
    offerId = response.data.resource.id;
    userId = response.data.resource.userId;
  })
  describe('User-changePic API test', () => {
    step('changePic successfully', async () => {
    const formData = new FormData();
    const filePath = path.join(__dirname, 'assets','avatar.png');
    formData.append('image', fs.createReadStream(filePath), {
      filename: 'avatar.png',
      contentType: 'image/jpeg',
    }); 
    const response = await axios.put('http://localhost:8000/api/v1/user/changePic', formData, {headers: {
        ...formData.getHeaders(),         
        'x-auth-token': token,
        'x-locale': 'en'
      }});
    expect(response.status).to.equal(200);
  })
  })
  describe('Offer-uploadImages API test', () => {
    step('uploadImages successfully', async () => {
    const formData = new FormData();
    const filePath = path.join(__dirname, 'assets','avatar.png');
    formData.append('image', fs.createReadStream(filePath), {
      filename: 'avatar.png',
      contentType: 'image/jpeg',
    });
    const response = await axios.put(`http://localhost:8000/api/v1/offer/upload/images/${offerId}`, formData, {headers: {
        ...formData.getHeaders(),         
        'x-auth-token': token,
        'x-locale': 'en'
      }});
    expect(response.status).to.equal(200);
  })
  })
})