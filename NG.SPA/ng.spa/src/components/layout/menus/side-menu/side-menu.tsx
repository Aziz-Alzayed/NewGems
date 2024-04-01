import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { FC, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../../auth/auth-provider/auth-provider";
import { isAdmin, isSuper } from "../../../../auth/auth-services/auth-service";

const SideMenu: FC = () => {
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


    const menuPaths = ['/user-management', '/another-path', '/more-paths'];
    // Derive selected key from current location
    const selectedKey = menuPaths.find(path => location.pathname.startsWith(path)) || '/';

    const handleMenuClick = (e: { key: string }) => {
        navigate(e.key);
    };

    return (
        !userIsAdmin ? <></>
            :
            (
                <Sider collapsible >
                    <Menu
                        mode="inline"
                        selectedKeys={[selectedKey]}
                        onClick={handleMenuClick}
                    >
                        <Menu.Item key="/user-management">User Management</Menu.Item>
                    </Menu>
                </Sider>
            )

    );
}
export default SideMenu;