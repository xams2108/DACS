const { createAuth } = require("thirdweb/auth");
const { privateKeyToAccount } = require("thirdweb/wallets"); 
const thirdwebClient = require("./thirdwebClient"); // Đảm bảo đường dẫn đúng

const thirdwebAuth = createAuth({
  domain: process.env.CLIENT_DOMAIN, // Kiểm tra biến môi trường này
  client: thirdwebClient,
  adminAccount: privateKeyToAccount({
    client: thirdwebClient,
    privateKey: process.env.ADMIN_PRIVATE_KEY,
  }),
});

module.exports = thirdwebAuth;