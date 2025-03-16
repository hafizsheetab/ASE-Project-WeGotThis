module.exports = {
    auth: {
        login: ["email", "password", "expire"],
        register: ["email", "password", "firstName", "lastName", "expire"]
    },
    user : {
        changeSelf: ["firstName", "lastName", "expire"]
    }
   
}