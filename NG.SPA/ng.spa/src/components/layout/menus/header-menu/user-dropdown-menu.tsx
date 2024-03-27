import { FC, useState } from 'react';
import {  Dropdown, Button, Switch, MenuProps, Avatar } from 'antd';
import { LoginOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { useAuth } from '../../../../auth/auth-provider/auth-provider';
import { useTheme } from '../../theme-context';
import LoginForm from '../../../../auth/auth-forms/login-form';
import LogoutForm from '../../../../auth/auth-forms/logout-form';
import { MenuItemType, ItemType } from 'antd/es/menu/hooks/useItems';
import { useNavigate } from 'react-router-dom';

const UserDropdownMenu: FC = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
    const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);

    const userEmail:string = user?.email|| '';

    const onSwitchClick = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
    };

    const userEmailItem: MenuItemType | null = (userEmail) ? {
        key: 'userEmailItem',
        label: `${userEmail}` ,
        icon: <Avatar style={{ backgroundColor: '#f56a00', marginRight: 8 }}>
            {userEmail.charAt(0).toUpperCase()}
        </Avatar>,
        onClick: (() => navigate('/user-profile'))
    } : null;

    const logoutItem: MenuItemType | null = (userEmail) ?{
        key: 'logoutItem',
        label: 'Logout',
        icon: <LogoutOutlined style={{ marginRight: 8 }} />,
        onClick: () => setIsLogoutModalVisible(true),
    } : null;

    const loginItem: MenuItemType | null = (!userEmail) ? {
        key: 'loginItem',
        label: 'Login',
        icon: <LoginOutlined style={{ marginRight: 8 }} />,
        onClick: () => setIsLoginModalVisible(true),
    } : null;

    const onRegisterClick = () => {
        navigate('/register');
        setIsLoginModalVisible(false);
    
    }
    const themeTriggerItem: MenuItemType = {
        key: 'themeTriggerItem',
        label: (
            <span onClick={onSwitchClick}>
                <Switch checkedChildren="dark" unCheckedChildren='light' checked={theme === 'dark'} onChange={toggleTheme} />
            </span>
        ),
    }
    function dividerItem(isNeeded: boolean): ItemType<MenuItemType> | null
    {
        if (isNeeded)
            return { type: 'divider' }
        else
            return null;
    };
    const menuItems: MenuProps['items'] = [
        userEmailItem,
        dividerItem(!!userEmail),
        themeTriggerItem,
        dividerItem(!!(logoutItem || loginItem)),
        logoutItem || loginItem
    ];

    const userMenuProps: MenuProps = {
        mode: "vertical",
        theme,
        items: menuItems
    };

    return (
        <>
            <Dropdown menu={userMenuProps} trigger={['click']}>
                <Button shape="circle" icon={<UserOutlined />} />
            </Dropdown>
            {isLoginModalVisible && <LoginForm isOpen={isLoginModalVisible} onClose={() => setIsLoginModalVisible(false)} onRegisterClick={onRegisterClick} />}
            {isLogoutModalVisible && <LogoutForm isOpen={isLogoutModalVisible} onClose={() => setIsLogoutModalVisible(false)} />}
        </>
    );
};

export default UserDropdownMenu;
