import { Alert, Button, Form, Input, Modal } from "antd";
import { FC, useState } from "react";
import AthenticatedComponent from "../../../../auth/auth-wrappers/authenticated-user-components";
import { UpdateUserPasswordDto } from "../../../../models/user-models/user-models";
import userStore from 'stores/user-stores/user-store';
import { ErrorNotification, SuccessNotification } from "../../../notification/notification-components";

type ResetPasswordModalProps = {
    isResetPasswordModalOpen: boolean;
    closeResetPasswordModal: () => void;
};

const ResetPasswordModal: FC<ResetPasswordModalProps> = ({ isResetPasswordModalOpen, closeResetPasswordModal }) => {
    const [form] = Form.useForm();
    const [submitError, setSubmitError] = useState<string | null>(null);

    const onResetPassword = async (values: { oldPassword: string; newPassword: string; confirmPassword: string }) => {
        try {
            const requestDto: UpdateUserPasswordDto = { oldPassword: values.oldPassword, newPassword: values.newPassword };
            const responde = await userStore.UpdateUserPassword(requestDto);
            if (responde.passed) {
                SuccessNotification('Passowrd has been updated succeccfuly');
            }
            else
                ErrorNotification('Passowrd has not been updated!', responde.message)

            // Reset form and state
            form.resetFields();
            setSubmitError(null);
            closeResetPasswordModal();
        } catch (error) {
            // Handle errors (e.g., show error message)
            setSubmitError('An error occurred while resetting the password.');
        }
    };
    return (
        <Modal
            title="Reset Password"
            open={isResetPasswordModalOpen}
            onCancel={() => {
                setSubmitError(null);
                closeResetPasswordModal();
            }}
            footer={null}
        >
            {submitError && <Alert message={submitError} type="error" showIcon />}
            <Form form={form} onFinish={onResetPassword}>
                <Form.Item
                    name="oldPassword"
                    rules={[{ required: true, message: 'Please input your old password!' }]}
                >
                    <Input.Password placeholder="Old Password" />
                </Form.Item>
                <Form.Item
                    name="newPassword"
                    rules={[
                        { required: true, message: 'Please input your new password!' },
                        { min: 8, message: 'Password must be at least 8 characters long.' },
                        { pattern: new RegExp("[A-Z]"), message: 'Password must contain an uppercase letter.' },
                        { pattern: new RegExp("[a-z]"), message: 'Password must contain a lowercase letter.' },
                        { pattern: new RegExp("[0-9]"), message: 'Password must contain a digit.' },
                        { pattern: new RegExp("[^a-zA-Z0-9]"), message: 'Password must contain a non-alphanumeric character.' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (value === getFieldValue('oldPassword')) {
                                    return Promise.reject(new Error('The new password cannot be the same as your old password.'));
                                }
                                return Promise.resolve();
                            },
                        }),
                    ]}
                >
                    <Input.Password placeholder="New Password" />
                </Form.Item>
                <Form.Item
                    name="confirmPassword"
                    dependencies={['newPassword']}
                    rules={[
                        { required: true, message: 'Please confirm your new password!' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('newPassword') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password placeholder="Confirm New Password" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default AthenticatedComponent(ResetPasswordModal);