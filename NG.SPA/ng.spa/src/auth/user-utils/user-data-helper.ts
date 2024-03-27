import SecureLS from 'secure-ls';
import { IUserInfo } from '../../models/auth-models/auth-models';

const ls = new SecureLS({ encodingType: 'aes', isCompression: false });

const USER_KEY = 'ExpensesFlowUserApp';

export const saveUserData = (userData: IUserInfo) => {
    ls.set(USER_KEY, userData);
};

export const getUserData = (): IUserInfo | null => {
    return ls.get(USER_KEY) || null;
};

export const clearUserData = () => {
    ls.remove(USER_KEY);
};
