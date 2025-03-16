module.exports = {
    auth: {
        login: ["email", "password", "expire"],
        register: ["email", "password", "firstName", "lastName", "expire"],
        forgotPassword: ["email","expire"],
        resetPassword: ["password", "confirmPassword", "expire"]
    },
    user : {
        changeSelf: ["firstName", "lastName", "expire"]
    }
   
}