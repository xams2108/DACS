const authAPIRoute = require("./auth.route")
const orderAPIRoute = require("./order.route")
const cryptocurrencyAPIRoute = require("./cryptocurrency.route")
const userAPIRoute = require("./user.route")
const newsAPIRoute = require("./news.route")
module.exports = (app) => {

    // Middleware áp dụng cho tất cả routes
    //API
    app.use(`/api/user`, userAPIRoute)
    app.use(`/api/auth`, authAPIRoute)
    app.use(`/api/order`, orderAPIRoute)
    app.use(`/api/market/cryptocurrency`, cryptocurrencyAPIRoute)
    app.use(`/api/news`, newsAPIRoute)

    
};