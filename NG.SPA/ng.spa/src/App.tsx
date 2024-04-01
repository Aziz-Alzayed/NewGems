import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './AppRoutes';
import AuthProvider from './auth/auth-provider/auth-provider';
import AppLayout from './components/layout/app-layout';
import ThemeProvider from './components/theme-configs/config-provider';
import ErrorBoundary from './error-handlers/error-boundary';

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <ErrorBoundary>
                    <ThemeProvider>
                        <AppLayout>
                            <AppRoutes />
                        </AppLayout>
                    </ThemeProvider>
                </ErrorBoundary>
            </AuthProvider>
        </BrowserRouter>
    );
}
export default App;
