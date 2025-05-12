const { acceptOfferRequest, rejectOfferRequest, giveReview } = require("../modules/Offer/controller/offer.controller");

const baseUrl = 'http://localhost:8000/api/v1';

const urls = {
  login:   `${baseUrl}/auth/login`,
  register: `${baseUrl}/auth/register`,
  getSelf: `${baseUrl}/user/getSelf`,
  changeSelf: `${baseUrl}/user/changeSelf`,
  getReviews: `${baseUrl}/user/getReviews`,
  createOffer: `${baseUrl}/offer/create`,
  editOffer: `${baseUrl}/offer/edit`,
  getOffer: `${baseUrl}/offer/get`,
  getOffers: `${baseUrl}/offer/getAll`,
  deleteOffer: `${baseUrl}/offer/delete`,
  template: `${baseUrl}/offer/template`,
  myOffers: `${baseUrl}/offer/my/Offers`,
  addRequests: `${baseUrl}/offer/add/requests`,
  getMyRequestsToOffers: `${baseUrl}/offer/getMyRequestsToOffer`,
  getRequestsOnMyOffers: `${baseUrl}/offer/getRequestsOnMyOffers`,
  getAllRequests: `${baseUrl}/offer/getAll/requests`,
  completeOffer: `${baseUrl}/offer/complete`,
  acceptOffer: `${baseUrl}/offer/accept`,
  rejectOffer: `${baseUrl}/offer/reject`,
  withdrawRequest: `${baseUrl}/offer/withdraw/request`,
  giveReview: `${baseUrl}/offer/giveReview`,
}
module.exports = {
  urls
};