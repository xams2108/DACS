import { createThirdwebClient } from "thirdweb";  
const clientId = import.meta.env.VITE_TW_CLIENT_ID;
const client = createThirdwebClient({
  clientId: clientId,
});
export default client;
