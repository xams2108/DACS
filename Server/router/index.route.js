const userRoute = require("./user.route")
const notifyRoute = require("./notify.route")
module.exports = (app) => {

    // Middleware áp dụng cho tất cả routes
    app.use(`api/user`, userRoute)
    app.use(`api/notify`, notifyRoute)
    
};