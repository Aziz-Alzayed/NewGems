import React, { useState, useEffect, CSSProperties, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Button } from 'antd';
import { MenuFoldOutlined } from '@ant-design/icons'; // For the toggle button icon
import UserDropdownMenu from './user-dropdown-menu';
import logoImage from 'assets/images/Logo-White.png';
import { Header } from 'antd/es/layout/layout';
import { MenuItemType } from 'antd/es/menu/hooks/useItems';
import { DrawerMenu } from './drawer-menu';


const HeaderMenu: FC = () => {
    const navigator = useNavigate();
    const [visible, setVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    // Handle window resize
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Toggle drawer visibility
    const toggleDrawer = () => setVisible(!visible);

    const headerStyles: CSSProperties = {
        padding: '0 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'fixed',
        zIndex: 10,
        width:'100%'
    };

    const logoDivStyle: CSSProperties = {
        minWidth: '182px',
        height: '32px',
        marginInlineEnd: '24px',
        display: 'flex',      // Ensures contents are centered
        alignItems: 'center', // Vertically centers the image
        justifyContent: 'center', // Horizontally centers the image
        cursor: 'pointer',
    };

    const logoImageStyle: CSSProperties = {
        maxWidth: '100%', // Ensures the image does not exceed the container's width
        maxHeight: '100%', // Ensures the image does not exceed the container's height
        objectFit: 'contain', // Maintains the aspect ratio of the image
    };

    const menuItems: MenuItemType[] = [
        {
            key: 'homePageTab',
            label: 'Home',
            onClick: (() => navigator('/'))
        }
    ];

    return (
        <>
            <Header style={headerStyles}>
                <div style={logoDivStyle} onClick={() => navigator('/')}>
                    <img src={logoImage} alt="Logo" style={logoImageStyle} />
                </div>
                {!isMobile ? (
                    <>
                        <Menu mode="horizontal" items={menuItems} style={{ width: '85%' }} />
                        <UserDropdownMenu />
                    </>
                ) : (
                    <Button icon={<MenuFoldOutlined />} onClick={toggleDrawer} />
                )}
            </Header>
            {visible && <DrawerMenu visible={visible} menuItems={menuItems} toggleDrawer={toggleDrawer} />}
        </>
    );
}

export default HeaderMenu;