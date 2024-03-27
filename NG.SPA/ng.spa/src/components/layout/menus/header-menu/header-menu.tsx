import { Menu } from "antd";
import { Header } from "antd/es/layout/layout";
import { MenuItemType } from "antd/es/menu/hooks/useItems";
import { CSSProperties, FC } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../theme-context";
import UserDropdownMenu from "./user-dropdown-menu";

import logoImage from 'assets/images/x.png';

const HeaderMenu: FC = () => {
    const { theme } = useTheme();
    const navigator = useNavigate();

    const headerStyles: CSSProperties = {
        padding: '0 16px',
        display: 'flex',
        alignItems: 'center',
        background: (theme === "light") ? '#fff' : '#001529',
        borderBottom: (theme === "light") ? '1px solid #f0f0f0':'',  // Adjust the header height as needed
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
                <Menu mode="horizontal" items={menuItems} theme={theme} style={{ width:'85%' }} />
                <UserDropdownMenu />
            </Header>
        </>
    );
}

export default HeaderMenu;