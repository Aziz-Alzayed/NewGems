import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../../auth/auth-forms/login-form';

const LoginPage: FC = () => {
    const navigate = useNavigate();

    const handleLoginClose = () => {
        navigate('/');
    };

    return (
        <div className="login-page-container">
            <LoginForm isOpen={true} onClose={handleLoginClose}/>
        </div>
    );
};

export default LoginPage;
