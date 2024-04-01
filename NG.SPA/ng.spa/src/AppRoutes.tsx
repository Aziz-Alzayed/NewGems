import { FC } from "react";
import { Route, Routes } from 'react-router-dom';
import UserProfile from "./components/modules/user-profile/user-profile";
import EmailVerificationPage from "./components/pages/email-verification-page";
import HomePage from "./components/pages/home-page";
import LandingPage from "./components/pages/landing-page";
import LoginPage from "./components/pages/login-page";
import ResetForgatePasswordPage from "./components/pages/reset-forget-password-page";
import NotFoundPage from "./error-handlers/not-found-page";

export const AppRoutes: FC = () => (
    <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/verify-email" element={<EmailVerificationPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/unauthorized" element={<NotFoundPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/reset-password" element={<ResetForgatePasswordPage />} />
    </Routes>
);