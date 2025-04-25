import client  from "../../client";
import { ConnectButton } from "thirdweb/react";
function ConnectWallet() {
    return(
        <>
            <ConnectButton
                client={client}
                
            />
        </>
    )
}
export default ConnectWallet