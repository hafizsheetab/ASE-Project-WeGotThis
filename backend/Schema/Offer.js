
const dynamoose = require("dynamoose");

const OfferSchema = new dynamoose.Schema({
        "id": String,
        "owner": String,
        "requests": [String],
        "title": String,
        "description": String,
        "images": {
            type: Array,
            schema: [String]
        },
        "location": {
            type: Object,
            schema: {
                address: String
            }
        },
        "priceMode": {
            type: String,
            enum: ["fixed", "negotiation"]
        },
        "price": {
            type: Number,
            required: function () {
                return this.priceMode === "fixed";
            }
        },
        "startingPrice": {
            type: Number,
            required: function () {
                return this.priceMode === "negotiation";
            }
        },
        "availability": {
            type: Boolean,
            default: true
        },
        "type": {
            type: String,
            enum: ["offering", "seeking"]
        },
        "status": {
            type: String,
            enum: ["active", "inactive"],
            default: "active"
        },
        "categories": {
            type: Array,
            schema: [String]
        },
        "estimatedTime": {
            type: Number,
        }
    },
{
        timestamps: true
})

const Offer = dynamoose.model("Offer", OfferSchema, {initialize: true, update: true});
module.exports = Offer

