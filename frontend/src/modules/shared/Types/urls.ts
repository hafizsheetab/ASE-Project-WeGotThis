import { deleteOffer } from "../../offerList/services"

const baseUrl = "http://localhost:8000"
const preamble = "api/v1"
export default {
    login: `${baseUrl}/${preamble}/auth/login`,
    register: `${baseUrl}/${preamble}/auth/register`,
    forgotPassword: `${baseUrl}/${preamble}/auth/forgotPassword`,
    resetPassword: `${baseUrl}/${preamble}/auth/resetPassword`,
    getOfferCreationTemplate: `${baseUrl}/${preamble}/offer/template`,
    createOffer: `${baseUrl}/${preamble}/offer/create`,
    uploadOfferImage: `${baseUrl}/${preamble}/offer/upload/images/`,
    getAllOffers:`${baseUrl}/${preamble}/offer/getAll`,
    getOneOffer: `${baseUrl}/${preamble}/offer/get/`,
    getSelf: `${baseUrl}/${preamble}/user/getSelf`,
    changePic: `${baseUrl}/${preamble}/user/changePic`,
    changeSelf: `${baseUrl}/${preamble}/user/changeSelf`,
    myOffers: `${baseUrl}/${preamble}/offer/my/offers`,
    deleteOffer: `${baseUrl}/${preamble}/offer/delete/`,
    addRequestToOffer: `${baseUrl}/${preamble}/offer/add/requests/`,
    getAllBookingRequests: `${baseUrl}/${preamble}/offer/getAll/requests`,
    acceptBookingRequest: `${baseUrl}/${preamble}/offer/accept/`,
    rejectBookingRequest: `${baseUrl}/${preamble}/offer/reject/`,
    completeBookingRequest: `${baseUrl}/${preamble}/offer/complete/`,
    getReviews: `${baseUrl}/${preamble}/user/getReviews/`,
    giveReview: `${baseUrl}/${preamble}/offer/giveReview/`,
    getUser: `${baseUrl}/${preamble}/user/getUser/`,
    withdrawBookingRequest: `${baseUrl}/${preamble}/offer/withdraw/`

}

