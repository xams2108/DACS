const mongoose = require("mongoose")
module.exports.connect = async () => {
    try {
        await mongoose.connect(process.env.MONGOOSEURL);
        console.log("Kết nối database thành công")
    } catch (error) {
        console.log(`Kết nối database lỗi: ${error}`)
    }
}
