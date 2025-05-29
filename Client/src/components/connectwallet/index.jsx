import { ConnectButton, darkTheme } from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";
import { ethereum } from "thirdweb/chains";
import authService  from "../../services/api/auth";
import client from "../../client";
import "./connectWallet.scss";
import { useAuthProvider } from "../../providers/authProvider";

const wallets = [
  createWallet("io.metamask"),
  createWallet("com.okex.wallet"),
];


function ConnectWallet() {
    const { setIsLogin } = useAuthProvider();

    const auth = {
      getLoginPayload: async ({ address }) => {
        return authService.getLoginPayload(address, ethereum.id.toString());
      },

      doLogin: async (params) => {
        const res = await authService.doLogin(params);
        if (res) {
          setIsLogin(true); 
        }
        return res;
      },

      isLoggedIn: async () => {
        const loggedIn = await authService.isLoggedIn();
        if (loggedIn) {
          setIsLogin(true);
        } else {
          setIsLogin(false);
        }
        return loggedIn;
      },

      doLogout: async () => {
        await authService.doLogout();
        setIsLogin(false);
      },
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
       theme={darkTheme({
        colors: {
          borderColor: "hsl(212, 12%, 21%)",
          separatorLine: "hsl(229, 13%, 17%)",
          accentText: "hsl(151, 100%, 45%)",
          tertiaryBg: "hsl(165, 82%, 51%)",
          modalBg: "hsl(215, 21%, 11%)",
          accentButtonBg: "hsl(165, 82%, 51%)",

        },
      })}
      className="connect-button"
      connectModal={{ size: "compact" }}
      auth={auth}
      detailsModal={detailsModal}
      
    />
  );
}

export default ConnectWallet;
