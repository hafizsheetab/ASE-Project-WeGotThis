module.exports = {
    auth: {
        login: ["email", "password", "expire"],
        register: ["email", "password", "firstName", "lastName", "expire"],
        forgotPassword: ["email"],
        resetPassword: [ "password", "expire"]
    },
    user : {
        changeSelf: ["firstName", "lastName", "expire"]
    }
   
}