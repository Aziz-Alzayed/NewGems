import { FC, useState } from 'react';
import { useAuth } from '../auth-provider/auth-provider';
import { Button, Modal, Spin } from 'antd';

interface LogoutFormProps {
    isOpen: boolean;
    onClose: () => void;
}

const LogoutForm: FC<LogoutFormProps> = ({ isOpen, onClose }) => {
    const { handleLogout } = useAuth();
    const [isLoading, setIsLoading] = useState(false);

    const onConfirmLogout = async () => {
        try {
            setIsLoading(true);
            await handleLogout();
        } catch (error) {
            console.error('Error while logging out', error);
        } finally {
            setIsLoading(false);
            onClose();
        }
    };

    return (
        <Spin spinning={isLoading}>
            <Modal
                title="Confirm Logout"
                open={isOpen}
                onCancel={onClose}
                footer={
                    [
                        <Button key="back" onClick={onClose}>
                            Cancel
                        </Button>,
                        <Button key="submit" type="primary" onClick={onConfirmLogout}>
                            Confirm Logout
                        </Button>,
                    ]}
            >
                <p>Are you sure you want to log out?</p>
            </Modal>
        </Spin>
    );
};

export default LogoutForm;
