import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { FC, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../../auth/auth-provider/auth-provider";
import { isAdmin, isSuper } from "../../../../auth/auth-services/auth-service";

interface SideMenuProps {
    collapsed: boolean;
    onCollapse: (collapsed: boolean) => void;
}

const SideMenu: FC<SideMenuProps> = ({ collapsed, onCollapse }) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [userIsAdmin, setUserIsAdmin] = useState<boolean>(false);

    useEffect(() => {
        const checkRoles = async () => {
            const isAdminUser = await isAdmin();
            const isSuperUser = await isSuper();
            setUserIsAdmin((user && (isAdminUser || isSuperUser)) || false);
        };

        if (user) {
            checkRoles();
        } else {
            setUserIsAdmin(false);
        }
    }, [user]);

    const menuPaths = ['/user-management', '/products-portal', '/more-paths'];
    // Derive selected key from current location
    const selectedKey = menuPaths.find(path => location.pathname.startsWith(path)) || '/';

    const handleMenuClick = (e: { key: string }) => {
        navigate(e.key);
    };

    return (
        !userIsAdmin ? <></>
            :
            (
                <Sider
                    collapsible
                    collapsed={collapsed}
                    onCollapse={onCollapse}
                    collapsedWidth={80}
                    style={{
                        overflowY: 'auto',
                        height: '100vh',
                        position: 'fixed',
                        left: 0
                    }}
                >
                    <Menu
                        mode="inline"
                        selectedKeys={[selectedKey]}
                        onClick={handleMenuClick}
                    >
                        <Menu.Item key="/user-management">User Management</Menu.Item>
                        <Menu.Item key="/products-portal">Products Portal</Menu.Item>
                    </Menu>
                </Sider>
            )
    );
}
export default SideMenu;
