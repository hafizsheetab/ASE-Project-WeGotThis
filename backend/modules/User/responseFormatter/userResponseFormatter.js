const userResponseFormat = (user) => {
    return {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        expire: user.expire,
        id: user.id
    }
}

module.exports = {userResponseFormat}