import { setAuthTokens, clearAuthTokens, getAccessToken, getRefreshToken, isLoggedIn} from 'axios-jwt';
import { jwtDecode } from 'jwt-decode';
import { postAuthRequest } from '../../services/api-services/api-auth-service';
import { postRequest } from '../../services/api-services/api-service';
import { ILoginRequest, IUserInfo, TokenPayload } from '../../models/auth-models/auth-models';
import { AppRoles } from './role-management';
import { saveUserData, clearUserData } from '../user-utils/user-data-helper';

export const login = async (params: ILoginRequest): Promise<IUserInfo> => {
    try {
        const response = await postRequest('/auth/login', params);

        setAuthTokens({
            accessToken: response.data.accessToken,
            refreshToken: response.data.refreshToken,
        });
        saveUserData(response.data.userInfo);
        // Return user data along with tokens
        return response.data.userInfo;
    } catch (error) {
        console.error('Error login:', error);
        throw error;
    }
};

export const logout = async (): Promise<void> => {
    try {
        await postAuthRequest('/auth/logout');
        clearAuthTokens();
        clearUserData();
    } catch (error) {
        console.error('Error out:', error);
        throw error;
    }
};

export const getRoles = async (): Promise<string[]> => {
    try {
        const accessToken = await getAccessTokenAsync();
        if (accessToken) {
            const decoded: TokenPayload = jwtDecode<TokenPayload>(accessToken);
            // Adjust the key to match the JWT structure
            const roles = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

            // Ensure roles is in an array format
            return Array.isArray(roles) ? roles : [roles];
        }
        return [];
    } catch (error) {
        console.error('Error decoding token:', error);
        throw error;
    }
};


export const isAuthenticated = async (): Promise<boolean> => {
    return await isLoggedIn();
};

export const isAdmin = async (): Promise<boolean> => {
    const roles = await getRoles();
    return roles.includes(AppRoles.Admin);
}

export const isSuper = async (): Promise<boolean> => {
    const roles = await getRoles();
    return roles.includes(AppRoles.Super);
}

export const getAccessTokenAsync = async (): Promise<string | undefined> => {
    return await getAccessToken();
};

export const getRefreshTokenAsync = async (): Promise<string | undefined> => {
    return await getRefreshToken();
};