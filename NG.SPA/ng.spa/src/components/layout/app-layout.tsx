import { FC, PropsWithChildren } from 'react';
import { Layout, } from 'antd';
import HeaderMenu from './menus/header-menu/header-menu';
import SideMenu from './menus/side-menu';
import { ThemeProvider } from './theme-context';

const { Content } = Layout;

const AppLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <ThemeProvider>
            <Layout style={{ minHeight: '100vh' }}>
                <Layout>
                    <HeaderMenu />
                    <Layout>
                        <SideMenu />
                        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
                            {children}
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        </ThemeProvider>
    );
};

export default AppLayout;