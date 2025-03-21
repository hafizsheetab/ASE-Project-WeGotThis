module.exports = {
    auth: {
        login: ["email", "password", "expire"],
        register: ["email", "password", "firstName", "lastName", "expire"],
        forgotPassword: ["email"],
        resetPassword: [ "password", "expire"]
    },
    user : {
        changeSelf: ["firstName", "lastName", "expire"]
    },
    offer:{
        createOffer: [
            "title", "description", "images", "location",
            "priceMode", "price", "startingPrice", "availability",
            "type", "categories", "estimatedTime", "status"
        ],
        editOffer: [
            "title", "description", "images", "location",
            "priceMode", "price", "startingPrice", "availability",
            "type", "categories", "estimatedTime", "status"
        ],
        getOffer: ["offerId"],
        getOffers: [],
        deleteOffer: ["offerId"]
    }
   
}