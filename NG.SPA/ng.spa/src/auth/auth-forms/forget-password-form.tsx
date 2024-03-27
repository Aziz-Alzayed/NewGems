import React, { useState } from 'react';
import { Modal, Form, Input, Button, Typography } from 'antd';
import { ErrorNotification, SuccessNotification } from '../../components/notification/notification-components';
import userStore from '../../stores/user-stores/user-store';
import { ForgetPasswordDto } from '../../models/user-models/user-models';
import { useNavigate } from 'react-router-dom';
import { resetPasswordPath } from '../../../apiConfig';

interface ForgotPasswordFormProps {
    isOpen: boolean;
    onClose: () => void;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ isOpen, onClose }) => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const [submitted, setSubmitted] = useState<boolean>(false);

    const handleSubmit = async (values: { email: string }) => {
        try {
            setLoading(true);
            const forgetPasswordDto: ForgetPasswordDto = { email: values.email, resetUrl: resetPasswordPath }
            const result = await userStore.ForgetPassword(forgetPasswordDto);
            console.log('Submitting forgot password request for:', values.email);
            if (result.passed) {
                SuccessNotification(`Submitting forgot password request for: ${values.email}`, 'Check your email.');
                navigate('/login');
            }
            else
                ErrorNotification("Failed to submit forgot password request.", result.message);

        } catch (error) {
            console.error('Failed to submit forgot password request', error);
        }
        finally {
            setLoading(false);
        }
    };


    return (
        <Modal
            title="Forgot Password"
            open={isOpen}
            onCancel={() => {
                onClose();
                setSubmitted(false);
            }}
            footer={null}
        >
            {!submitted ? (
                <Form form={form} layout="vertical" onFinish={handleSubmit}>
                    <Typography.Text>
                        Enter your email address and we'll send you a link to reset your password.
                    </Typography.Text>
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}
                    >
                        <Input placeholder="Email" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block loading={loading}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            ) : (
                <Typography.Text>Check your email for the reset link.</Typography.Text>
            )}
        </Modal>
    );
};

export default ForgotPasswordForm;
