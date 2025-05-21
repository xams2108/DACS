import {Layout } from 'antd';
import Notify from '../components/notify'
import MenuSider from '../components/menuSider';
import ConnectWallet from '../components/connectwallet'
import { MenuFoldOutlined,MenuUnfoldOutlined } from '@ant-design/icons'
import './layoutDefault.scss'
import { useState } from 'react';
import {Outlet } from "react-router-dom";
const { Content, Footer, Sider } = Layout;



function LayoutDefault() {
    const [collapsed, setCollapsed] = useState(false);
    return(
        <>
            <header className='header'>
                <div className={`header__logo ${collapsed && "header__logo--active"}`}>
                    <img src={collapsed? "/image/logo-mini.jpg": "/image/Logo.png"} alt='logo'></img>
                </div>
                <div className='header__nav'>
                    <div className='header__nav__left'>
                        <div className='control' onClick={() =>setCollapsed(!collapsed)}>
                            {collapsed ? <MenuUnfoldOutlined/>:<MenuFoldOutlined />}
                            
                        </div>
                       
                    </div>
                    <div className='header__nav__right'>
                        <div className='header__nav__right__item'>
                            <Notify/>
                            <ConnectWallet/>
                        </div>
                    
                    </div>
                </div>
            </header>
            <Layout>
                <Sider theme='light' collapsed={collapsed}>
                    <MenuSider/>
                </Sider>

                <Content  className='content'>
                    <Outlet/>
                </Content>
            </Layout>
            <Footer>footer</Footer>
        </>
    )
}
export default LayoutDefault