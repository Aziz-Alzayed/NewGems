import React, { useEffect, useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ErrorNotification, SuccessNotification } from '../notification/notification-components';
import userStore from '../../stores/user-stores/user-store';
import PasswordInput from '../../auth/auth-forms/password-rules/password-input';

interface ResetPasswordFormData {
    password: string;
    confirmPassword: string;
}

const ResetForgatePasswordPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const email = searchParams.get("email");
    const token = searchParams.get("token");
    console.log(email, token);

    useEffect(() => {
        if (!email || !token) {
            ErrorNotification('Email or the token is invalid!');
            navigate('/login'); // Redirect them to a safe location
        }
    }, [email, token, navigate]);

    const onFinish = async (values: ResetPasswordFormData) => {
        if (!email && !token) {
            ErrorNotification('Email or the token is invalid!');
            return;
        }
        
        if (values.password !== values.confirmPassword) {
            notification.error({
                message: 'Error',
                description: 'Passwords do not match!',
            });
            return;
        }
        setLoading(true);
        try {
            if (email && token) {
                const result = await userStore.ResetForgetPassword({ email, newPassword: values.password, token })
                if (result.passed) {
                    SuccessNotification('Password has been reset');
                    navigate('/login');
                } else {
                    ErrorNotification('Error: password has been not rest');
                }
            } 
        } catch (error: any) {
            notification.error({
                message: 'Error',
                description: error.message || 'Failed to reset password.',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form
            name="reset_password_form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
        >
            <PasswordInput />
            <Form.Item
                name="confirmPassword"
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                    { required: true, message: 'Please confirm your password!' },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('The two passwords do not match!'));
                        },
                    }),
                ]}
            >
                <Input.Password placeholder="Confirm Password" />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading} block>
                    Reset Password
                </Button>
            </Form.Item>
        </Form>
    );
};

export default ResetForgatePasswordPage;
