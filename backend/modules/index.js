const { changeAllFilesToJS } = require("../convertSwagger")
const User = require("../Schema/User")
const Offer = require("../Schema/Offer")

const enrollRoutes = async (app) => {
    await changeAllFilesToJS("./modules/")
    const prefix = "api"
    const versionName = "v1"
    const totalPrefix = `/${prefix}/${versionName}`
    await changeAllFilesToJS("./modules/Authentication/swagger/")
    app.use(`${totalPrefix}/auth`, require("./Authentication/api/auth.route"))
    await changeAllFilesToJS("./modules/User/swagger/")
    app.use(`${totalPrefix}/user`, require("./User/api/user.route"))
    await changeAllFilesToJS("./modules/Offer/swagger/")
    app.use(`${totalPrefix}/offer`, require("./Offer/api/offer.route"))
    User.table()
    Offer.table()
}

module.exports = {enrollRoutes}