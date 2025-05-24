const express = require("express");
const database = require("./config/database");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require('express-session');
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT;


const corsOptions = {
  origin: process.env.CLIENT_DOMAIN, 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, 
};

// Middleware
app.use(cors(corsOptions ));
app.use(cookieParser());
app.use(session({
  secret: process.env.ADMIN_PRIVATE_KEY, // Khóa bí mật, bạn thay bằng chuỗi phức tạp hơn nhé
  resave: false,                      // Không lưu session nếu chưa thay đổi
  saveUninitialized: false,           // Không tạo session mới nếu chưa dùng

}));
app.use(bodyParser.json());

// Khởi tạo server HTTP và Socket.io
const server = http.createServer(app);
const io = new Server(server, {
  cors: {origin: "*",}
});
const socket = require("./socket/index");
socket(io); 


// Route API
const route = require("./router/index.route");
route(app);

// Kết nối database và khởi động server
database.connect();
server.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
  console.log(`📡 Socket.IO running at ws://localhost:${port}`);
});