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
}