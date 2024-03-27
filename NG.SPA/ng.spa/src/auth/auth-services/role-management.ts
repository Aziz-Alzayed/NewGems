import { getRoles } from "./auth-service";

export enum AppRoles {
    Admin = "Admin",
    User = "User",
    Super = "Super"
}

export function getAllAppRoles(): string[] {
    return Object.values(AppRoles);
}

export const hasRequiredRole = async (requiredRoles: string[]): Promise<boolean> => {
    try {
        const userRoles = await getRoles();
        return requiredRoles.some(role => userRoles.includes(role));
    } catch (e) {
        console.error(e);
        return false;
    }
};
