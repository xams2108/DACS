import { Card } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import './index.scss';
import { useState } from 'react';
import NotifyContent from './NotifyContent';
import TradeContent from './TradeContent';
import { useAuthProvider } from '../../../../providers/authProvider';
import ConnectWallet from "../../../connectwallet";
function BoxOrder() {
  const [activeTab, setActiveTab] = useState("notify");
  const {user} = useAuthProvider()
  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  return (
    <div className="BoxOrder">
      <div className="BoxOrder__Header">
        <h3 className="BoxOrder__Header__Tabs">
          <span
            className={`BoxOrder__Header__Tab Notify ${activeTab === "notify" ? "BoxOrder__Header__Tab--active" : ""}`}
            onClick={() => handleTabChange("notify")}
          >
            Notifications
          </span>
          <span
            className={`BoxOrder__Header__Tab Trade ${activeTab === "trade" ? "BoxOrder__Header__Tab--active" : ""}`}
            onClick={() => handleTabChange("trade")}
          >
            Trade
          </span>
          
        </h3>
      </div>
      <Card className="BoxOrder__Body mt-20">
      {user ? (
        activeTab === "trade" ? <TradeContent /> : <NotifyContent />
      ) : (
        <div className="BoxOrder__Body__NotLoggedIn">
          <LockOutlined className="BoxOrder__Body__Icon" />
          <h3>Please connect your wallet to continue</h3>
          <p>You need to log in to view your notifications and manage your trades.</p>
          <ConnectWallet />
        </div>
      )}
    </Card>
    </div>
  );
}

export default BoxOrder;