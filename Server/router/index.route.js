const authAPIRoute = require("./API/auth.route")
const notifyAPIRoute = require("./API/notify.route")
const cryptocurrencyAPIRoute = require("./API/cryptocurrency.route")
const makertWSRoute = require("./WS/market.route")
const notifyWSRoute = require("./WS/notify.route")
module.exports = (app) => {

    // Middleware áp dụng cho tất cả routes
    //API
    app.use(`/api/auth`, authAPIRoute)
    app.use(`/api/notify`, notifyAPIRoute)
    app.use(`/api/market/cryptocurrency`, cryptocurrencyAPIRoute)
    //WS
    app.use(`/ws/notify`, notifyWSRoute)
    app.use(`/ws/market`, makertWSRoute)

    
};