const userRoute = require("./user.route")
const notifyRoute = require("./notify.route")
const cryptocurrencyRoute = require("./cryptocurrency.route")
module.exports = (app) => {

    // Middleware áp dụng cho tất cả routes
    app.use(`/api/user`, userRoute)
    app.use(`/api/notify`, notifyRoute)
    app.use(`/api/market/cryptocurrency`, cryptocurrencyRoute)
    
};