export const apiURL = process.env.REACT_APP_API_URL || '/api';
export const currentURI = process.env.REACT_APP_Current_URL || null;

export const verficationPath = (currentURI as string) + '/verify-email';
export const resetPasswordPath = (currentURI as string) + '/reset-password';