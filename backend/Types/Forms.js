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
            "title", "description", "location",
            "priceModeId", "price",  "availability",
            "typeId", "categoryIds", "startTime", "endTime"
        ],
        editOffer: [
            "title", "description", "location",
            "priceModeId", "price",  "availability",
            "typeId", "categoryIds", "startTime", "endTime"
        ],
        getOffer: [],
        getOffers: [],
        deleteOffer: ["offerId"]
    }
   
}