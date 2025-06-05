import { Menu } from 'antd';
import { DashboardOutlined, PictureOutlined, DollarOutlined, BarChartOutlined, SettingOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './menuSider.scss';

function MenuSider() {
    const items = [
        {
            label: <Link to="/">Dash Board</Link>,
            key: "/",
            icon: <DashboardOutlined />,
        },
        {
            label: "Market",
            key: "market",
            icon: <BarChartOutlined />,
            children: [
                {
                    label:<Link to="/market/cryptocurrency/BTCUSDT/15m">Cryptocurrency</Link>,
                    key: "cryptocurrency",
                    icon: <DollarOutlined />,
                },
                {
                    label: <Link to="market/nft">NFT</Link>,
                    key: "nft",
                    icon: <PictureOutlined />,
                },
            ]
        },
        {   
            label: <Link to="/settings">Settings</Link>,
            key: "/settings",
            icon: <SettingOutlined />,
        },
    ];

    return (
        <Menu
            theme="dark"
            mode="inline"
            items={items}
            defaultSelectedKeys={["/"]}
            className="custom-menu"
        />
    );
}

export default MenuSider;