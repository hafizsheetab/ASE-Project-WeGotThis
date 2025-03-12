const { userResponseFormat } = require("../responseFormatter/userResponseFormatter")



const getSelf = async (user) => {
    const service = "GETONE"
    return userResponseFormat(user)
}


module.exports = {getSelf}