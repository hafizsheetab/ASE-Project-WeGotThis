const dynamoose = require("dynamoose")

const UserSchema = new dynamoose.Schema({
    "id": String,
    "name": String,
    "email": String,
    "passwordHash": String
    
},
{
    timestamps: true
})

const User = dynamoose.model("User", UserSchema)
console.log(User.table().hashKey)
module.exports = User