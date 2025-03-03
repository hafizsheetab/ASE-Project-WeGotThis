const UserTypes = [
    {
        id: 1, name: "Admin",
        id: 2, name: "Super User"
    }
]

const getUserTypeFromId = (id) => {
    const type = UserTypes.find(v => v.id === id)
    return type
}

module.exports = { UserTypes, getUserTypeFromId}