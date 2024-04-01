import { Drawer, Menu } from "antd";
import { MenuItemType } from "antd/es/menu/hooks/useItems";
import { FC } from "react";
import UserDropdownMenu from "./user-dropdown-menu";
import { createStyles } from 'antd-style';
import type { DrawerClassNames, DrawerStyles } from 'antd/es/drawer/DrawerPanel';
interface DrawerMenuProps {
    menuItems: MenuItemType[];
    visible: boolean;
    toggleDrawer: () => void;
}

const style = (`
.ant-menu-title-content{
    border-bottom:solid
}
`);
const useStyle = createStyles(() => ({
    'drawer-body': {
       
    },
    'drawer-mask': {
        
    },
    'drawer-header': {
        background: "#f8d38c",
    },
    'drawer-footer': {
       
    },
    'drawer-content': {
        
    }

}));

/*ant - menu - title - content*/

export const DrawerMenu: FC<DrawerMenuProps> = ({ menuItems, toggleDrawer, visible }) => {
    const { styles } = useStyle();

    const classNames: DrawerClassNames = {
        body: styles['drawer-body'],
        mask: styles['drawer-mask'],
        header: styles['drawer-header'],
        footer: styles['drawer-footer'],
        content: styles['drawer-content'],
    };

    const drawerStyles: DrawerStyles = {
        mask: {
           
        },
        content: {
            
        },
        header: {
            
        },
        body: {
            
        },
        footer: {
           
        },
    };

    return (
        <>
            <style>{style}</style>
            <Drawer
                title="Menu"
                placement="right"
                onClose={toggleDrawer}
                open={visible}
                classNames={classNames}
                styles={drawerStyles}
            >
                <Menu mode="inline" items={menuItems} />
                <UserDropdownMenu style={{ marginTop: '0.5em', paddingLeft: '2em' }} />
            </Drawer>
        </>
    );
}