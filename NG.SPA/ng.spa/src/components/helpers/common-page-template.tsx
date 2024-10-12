import { Content } from "antd/es/layout/layout";
import { FC, PropsWithChildren } from "react"

const CommonPageTemplate: FC<PropsWithChildren> = ({ children }) => {

    const contentStyle: React.CSSProperties = {
        padding: '1em',
        paddingBottom:0
    };

    return (
        <Content style={contentStyle}>
            {children}
        </Content>
    )
};

export default CommonPageTemplate;