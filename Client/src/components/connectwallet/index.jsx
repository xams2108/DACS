import { ConnectButton } from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";
import { ethereum } from "thirdweb/chains";
import authService  from "../../services/api/auth";
import client from "../../client";
import "./connectWallet.scss";
const wallets = [
  createWallet("io.metamask"),
  createWallet("com.okex.wallet"),
];


function ConnectWallet() {
    const auth = {
        getLoginPayload: async ({ address }) =>
        authService.getLoginPayload(address, ethereum.id.toString()),

        doLogin: async (params) => authService.doLogin(params),

        isLoggedIn: async () => authService.isLoggedIn(),

        doLogout: async () => authService.doLogout(),
    };
    const detailsModal = 
      {
          hiddenWallets: ["walletId1"],
          hideBuyFunds: true,
          hideSwitchWallet: true,
          showBalanceInFiat: "USD",
          showTestnetFaucet: true
      }

  return (
    <ConnectButton
      client={client} 
      wallets={wallets}
      theme={"light"}
      className="connect-button"
      connectModal={{ size: "compact" }}
      auth={auth}
      detailsModal={detailsModal}
      
    />
  );
}

export default ConnectWallet;
