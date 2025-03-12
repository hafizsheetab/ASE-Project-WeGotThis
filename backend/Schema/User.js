const dynamoose = require("dynamoose")

const UserSchema = new dynamoose.Schema({
    "id": String,
    "firstName": String,
    "lastName": String,
    "email": {
        type: String,
        "index": true
    },
    "passwordHash": String,
    "expire": {
        type: Boolean,
        default: true
    }
    
},
{
    timestamps: true,
    
})

const User = dynamoose.model("User", UserSchema, {initialize: true, update: true})
module.exports = User