import { FC, PropsWithChildren } from 'react';
import { Layout, } from 'antd';
import HeaderMenu from './menus/header-menu/header-menu';
import SideMenu from './menus/side-menu/side-menu';
import BackTopFloatingButton from './floating-buttons/back-top-button';
import { AppFooter } from './menus/footer/footer';

const { Content } = Layout;

const AppLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
                <HeaderMenu />
                <SideMenu />
                <Content style={{ background: '#fff', minHeight: 280 }}>
                    {children}
            </Content>
            <AppFooter />
            <BackTopFloatingButton />
        </Layout>
    );
};

export default AppLayout;