import React from 'react';
import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const NotAuthorizedPage: React.FC = () => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate('/'); // Navigate to the home page or any other appropriate route
    };

    return (
        <Result
            status="403"
            title="403"
            subTitle="Sorry, you are not authorized to access this page."
            extra={<Button type="primary" onClick={goBack}>Back Home</Button>}
        />
    );
};

export default NotAuthorizedPage;
