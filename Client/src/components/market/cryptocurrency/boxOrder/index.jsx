import { Card } from 'antd';
import './index.scss';
import { useState } from 'react';
import NotifyContent from './NotifyContent';
import TradeContent from './TradeContent';

function BoxOrder() {
  const [activeTab, setActiveTab] = useState("notify");

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
        {activeTab === "trade" ? <TradeContent /> : <NotifyContent />}
      </Card>
    </div>
  );
}

export default BoxOrder;