import { Button, Result, Spin } from "antd";
import { FC, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../auth/auth-provider/auth-provider";
import userStore from "../../stores/user-stores/user-store";

const EmailVerificationPage: FC = () => {
    const [searchParams] = useSearchParams();
    const { user, updateUser } = useAuth();
    const navigate = useNavigate();
    const userId = searchParams.get("userId");
    const token = searchParams.get("token");
    const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'error'>('loading');

    useEffect(() => {
        const verifyEmail = async () => {
            if (userId && token) {
                try {
                    const response = await userStore.VerifyUserEmail(userId, token);
                    setTimeout(() => {
                    if (response.passed) {
                        setVerificationStatus('success');
                        if (user) {
                            updateUser({ ...user, emailConfirmed: true });
                        }    
                    } else {
                        setVerificationStatus('error');
                        }
                    }, 4000);
                } catch (error) {
                    setVerificationStatus('error');
                }
                finally {
                    navigate(window.location.pathname, { replace: true });
                }

            } else {
                setVerificationStatus('error');
            }
        };

        verifyEmail();
    }, [navigate]);

    const handleGoHome = () => {
        navigate('/');
    };

    const renderResult = (): JSX.Element => {
        switch (verificationStatus) {
            case 'loading':
                return <Spin size="large" />;
            case 'success':
                return (
                    <Result
                        status="success"
                        title="Email Successfully Verified!"
                        subTitle="Your email has been successfully verified."
                        extra={<Button type="primary" onClick={handleGoHome}>Go Home Page</Button>}
                    />
                );
            case 'error':
            default:
                return (
                    <Result
                        status="error"
                        title="Email Verification Failed"
                        subTitle="There was a problem verifying your email. Please try again or contact support."
                        extra={<Button onClick={handleGoHome}>Go to Login</Button>}
                    />
                );
        }
    };

    return renderResult();
};

export default EmailVerificationPage;
