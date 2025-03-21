const dynamoose = require('dynamoose');

const OfferSchema = new dynamoose.Schema({
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
    title:{
        type:String,
    }
    description:{
        type:String,
    }
    images:{
        type:Array,
        schema:[String]
    }
    //TODO: check if this is right
    location: {
        address: {
            type: String,
            required: function () {
                return !this.location.coordinates;
            }
        }
        coordinates: {
            type: {type: String, enum: ['Point'], default: 'Point'},
            coordinates: {
                type: [Number], // [longitude, latitude]
                required: function () {
                    return !this.location.address;
                }
            }
        },
    }
    priceMode:{
        type:String,
        enum:['fixed','negotiation']
    }
    price:{
        type:Number,
        required: function () {
            return this.priceMode === 'fixed';
        }
    }
    startingPrice:{
        type:Number,
        required: function () {
            return this.priceMode === 'negotiation';
        }
    }
    availability:{
        type:Boolean,
        default:true
    }
    type:{
        type:String,
        enum:['offering','seeking']
    }
        type:Date,
    }
    status:{
        type:String,
        enum:['active','inactive'],
        default:'active'
    }
    categories: {
        type: Array,  // multiple categories
        schema: [String],
    },
    //todo: check time from bookingSlot
    //     bookingSlot: { },
    estimatedTime: {
        type: Number,  // 60 = 1 hour
        required: true
    },
}

const Offer = dynamoose.model('Offer', OfferSchema, {initialize: true, update: true});
modul.exports=Offer;
