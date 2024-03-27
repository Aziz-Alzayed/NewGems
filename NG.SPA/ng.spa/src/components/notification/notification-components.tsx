import { notification } from 'antd';


export const Notification = (message: string, description: string | null = null) => {
    notification.open({
        message,
        description,
    });
}

export const SuccessNotification = (message: string, description: string | null = null) => {
    notification.success({
        message,
        description,
    });
}

export const WarrningNotification = (message: string, description: string | null = null) => {
    notification.warning({
        message,
        description,
    });
}

export const ErrorNotification = (message: string, description: string | null = null) => {
    notification.error({
        message,
        description,
    });
}

