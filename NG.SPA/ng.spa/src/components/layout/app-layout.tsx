import React, { FC, PropsWithChildren, useState } from 'react';
import { Layout } from 'antd';
import HeaderMenu from './menus/header-menu/header-menu';
import SideMenu from './menus/side-menu/side-menu';
import BackTopFloatingButton from './floating-buttons/back-top-button';
import { AppFooter } from './menus/footer/footer';

const { Content } = Layout;

const AppLayout: FC<PropsWithChildren> = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);

    const handleCollapse = (isCollapsed: boolean) => {
        setCollapsed(isCollapsed);
    };

    const contentLayoutStyle: React.CSSProperties = {
        marginLeft: collapsed ? 80 : 200,
        overflowY: 'auto'
    };

    const contentStyle: React.CSSProperties = {
        background: '#fff',
        minHeight: '100vh',
        overflowY: 'auto'
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <HeaderMenu />
            <Layout style={{ marginTop:'4.5em' }}>
                <SideMenu collapsed={collapsed} onCollapse={handleCollapse} />
                <Layout
                    style={contentLayoutStyle}
                >
                    <Content style={contentStyle}>
                        {children}
                    </Content>
                    <BackTopFloatingButton />
                    <AppFooter />
                </Layout>
            </Layout>
        </Layout>
    );
};

export default AppLayout;
