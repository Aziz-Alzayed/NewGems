import { ThemeConfig } from 'antd';

export const ThemeConfigs: ThemeConfig = {
    token: {
        fontFamily: 'sans-serif',
        
    },
    components: {
        Layout: {
            headerBg: "#2A2A2A",
        },
        Menu: {
            colorBgContainer: "#2A2A2A",
            itemColor: "#A9A9A9",
            itemHoverColor: "#FFFFFF",
            colorPrimary: "#f8d38c",
        },
        Button: {
            colorPrimary: "#f8d38c", //creame
            colorTextLightSolid: "#000000",
            colorPrimaryHover:"#E69E7f" // copper
            
        },
        FloatButton: {
            colorPrimary: "#f8d38c",
            colorPrimaryHover: "#E69E7f" 
        },
        Drawer: {
            colorBgElevated: "#2A2A2A",
            colorInfo: "#f8d38c",
            colorPrimaryText: "#f8d38c",
            colorTextHeading: "#A9A9A9",          
        },
        Checkbox: {
            colorPrimary: "#f8d38c",
        },
        Input: {
            colorPrimary: "#f8d38c",
            hoverBorderColor: "#f8d38c"
        }
    }
}