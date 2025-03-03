const userResponseFormat = (user) => {
    return {
        name: user.name,
        email: user.email
    }
}

module.exports = {userResponseFormat}