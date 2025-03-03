const dynamoose = require("dynamoose")
const User = require("./User")

const PostSchema = new dynamoose.Schema({
    "id": String,
    "name": String,
    "email": String,
    user: User
    
},
{
    timestamps: true
})

const Post = dynamoose.model("User", PostSchema)
console.log(Post.table().hashKey)
module.exports = Post