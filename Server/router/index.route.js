const authAPIRoute = require("./auth.route")
const orderAPIRoute = require("./notify.route")
const cryptocurrencyAPIRoute = require("./cryptocurrency.route")
const userAPIRoute = require("./user.route")
module.exports = (app) => {

    // Middleware áp dụng cho tất cả routes
    //API
    app.use(`/api/user`, userAPIRoute)
    app.use(`/api/auth`, authAPIRoute)
    app.use(`/api/order`, orderAPIRoute)
    app.use(`/api/market/cryptocurrency`, cryptocurrencyAPIRoute)

    
};