
const dynamoose = require("dynamoose");
const { getIdsOfEnum } = require("../utils");
const { PriceModeEnum, OfferTypeEnum } = require("../Types/OfferTypeEnums");

const OfferSchema = new dynamoose.Schema({
        "id": String,
        "owner": String,
        "requests": {
            type: Array,
            schema: {
                id: String,
                price: Number
            }
        },
        "title": String,
        "description": String,
        "imageUrl": String,
        "location": String,
        "priceModeId": {
            type: Number,
            enum: getIdsOfEnum(PriceModeEnum)
        },
        "price": {
            type: Number,
        },
        "availability": {
            type: Boolean,
            default: true
        },
        "typeId": {
            type: Number,
            enum: getIdsOfEnum(OfferTypeEnum)
        },
        "categoryIds": {
            type: Array,
            schema: [
                Number
            ]
        },
        startTime: Number,
        endTime: Number
    },
{
        timestamps: true
})

const Offer = dynamoose.model("Offer", OfferSchema, {initialize: true, update: true});
module.exports = Offer
