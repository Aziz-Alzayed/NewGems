import { BrowserRouter } from 'react-router-dom';
import './App.css'
import { AppRoutes } from './AppRoutes';
import AuthProvider from './auth/auth-provider/auth-provider';
import AppLayout from './components/layout/app-layout';
import ErrorBoundary from './error-handlers/error-boundary';

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <ErrorBoundary>
                    <AppLayout>
                        <AppRoutes />
                    </AppLayout>
                </ErrorBoundary>
            </AuthProvider>
        </BrowserRouter>
    );
}
export default App;
