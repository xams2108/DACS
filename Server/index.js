const express = require("express")
const database = require("./config/database")
const bodyparse = require("body-parser")
const cookieParser = require("cookie-parser")
const cors = require("cors")
require("dotenv").config()
const app = express()
const port = process.env.PORT

//cho phép FE gửi data lên tránh lỗi 
app.use(cors())
 
//cho phép lưu cookie
app.use(cookieParser())

//gửi json từ client
app.use(bodyparse.json())

//Route API
const route = require("./router/index.route")
route(app)

database.connect()
app.listen(port, () => {
    console.log(`Đang chạy trên port ${port}`)
})