import { Layout, Row, Col } from 'antd';
import Notify from '../components/notify';
import MenuSider from '../components/menuSider';
import ConnectWallet from '../components/connectwallet';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import './layoutDefault.scss';
import { useState } from 'react';
import { Outlet } from "react-router-dom";

const { Content, Footer, Sider } = Layout;

function LayoutDefault() {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <>
            <header className='header' style={{ backgroundColor: '#161b22', borderBottom: '1px solid #30363d' }}>
                <div className={`header__logo ${collapsed && "header__logo--active"}`}>
                    <img src={collapsed ? "/image/logo-mini.jpg" : "/image/Logo.png"} alt='logo'></img>
                </div>
                <div className='header__nav'>
                    <div className='header__nav__left'>
                        <div 
                            className='control' 
                            onClick={() => setCollapsed(!collapsed)}
                            style={{ color: '#c9d1d9' }}
                        >
                            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        </div>
                    </div>
                    <div className='header__nav__right'>
                        <div className='header__nav__right__item'>
                            <Notify />
                            <ConnectWallet />
                        </div>
                    </div>
                </div>
            </header>
            <Layout style={{ backgroundColor: '#0d1117' }}>
                <Sider 
                    theme='dark' 
                    collapsed={collapsed}
                    style={{ 
                        backgroundColor: '#161b22',
                        borderRight: '1px solid #30363d'
                    }}
                >
                    <MenuSider />
                </Sider>
                <Layout>
                    <Content className='content' style={{ backgroundColor: '#0d1117' }}>
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
             <Footer style={{ 
                 backgroundColor: '#161b22', 
                 padding: '20px 0',
                 borderTop: '1px solid #30363d'
             }}>
                        <Row >
                            <Col span={24} style={{ textAlign: 'center' }}>
                                <p style={{ color: '#c9d1d9', fontSize: '14px' }}>
                                    © 2025 All rights reserved. Designed by <a 
                                        href='https://x.com/trandotiendat' 
                                        target='_blank' 
                                        rel='noopener noreferrer'
                                        style={{ color: '#00e676' }}
                                    >TRAN DO TIEN DAT</a>
                                </p>
                            </Col>
                        </Row>
             </Footer>
        </>
    );
}

export default LayoutDefault;