import { CSSProperties, FC } from "react";
import logoImage from 'assets/images/Logo.png';

const HomePage: FC = () => {

    const layoutStyle: CSSProperties = {
        height: '100%', 
        width: '100', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: 'transparent' 
    };

    const contentStyle: CSSProperties = {
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        height: '100%',
        maxWidth: '100%'
    };

    const imageStyle: CSSProperties = {
        maxWidth: '25em',
        marginBottom: '20px',
    };

    return (
        <div style={layoutStyle}>
            <div style={contentStyle}>
                <img src={logoImage} alt="Logo" style={imageStyle} />
                <p style={{ fontSize: '1.2rem' }}>
                    Welcome to New Gems App
                </p>
            </div>
        </div>
    );
};

export default HomePage;