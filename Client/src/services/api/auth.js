import { getData, postData } from "../../utils/apiRequest";
const authService = {
  async getLoginPayload(address, chainId) {
    return await getData(`api/auth/login?address=${address}&chainId=${chainId}`);
  },
  async doLogin(payload) {
    return await postData("api/auth/login", payload);
  },
  async isLoggedIn() {
    return await getData("api/auth/isLoggedIn");
  },
  async doLogout() {
    return await postData("api/auth/logout", null);
  },
};

export default authService;
