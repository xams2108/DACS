const { createThirdwebClient } = require("thirdweb");

const secretKey = process.env.THIRDWEB_SECRET_KEY;
if (!secretKey) {
  throw new Error("THIRDWEB_SECRET_KEY is not defined in environment variables");
}
const thirdwebClient = createThirdwebClient({ secretKey });
module.exports = thirdwebClient;