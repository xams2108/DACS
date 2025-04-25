import { Menu } from 'antd';
import { DashboardOutlined, PictureOutlined, DollarOutlined, BarChartOutlined, SettingOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom';

function menuSider() {
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
                    label: <Link to="market/cryptocurrency">Cryptocurrency</Link>,
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
            label: <Link to="/setting">setting</Link>,
            icon: <SettingOutlined />,
        },
    ]
    return (
        <>
            <Menu
                mode="inline" 
                items={items}
                defaultSelectedKeys={["/"]}
                
            />
        </>
    )
}
export default menuSider