import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Outlet } from "react-router-dom";
import { Spin } from 'antd';
import usersStore from "../../../stores/admin-stores/admin-store";
import AdminRoleComponent from "../../../auth/auth-wrappers/admin-role-components";

const UsersLoader: React.FC = observer(() => {
    const { users, loadAllUsers } = usersStore;

    useEffect(() => {
        if (!users.length) {
            loadAllUsers();
        }
    },[]);

    if (!users.length) {
        return <div><Spin tip="Load Users..." /></div>;
    }
    else {
        return <Outlet />
    }
});

export default AdminRoleComponent(UsersLoader);