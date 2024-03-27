import { Button, Result, Typography } from 'antd';
import React, { ReactNode } from 'react';

const tableContainerStyles = {
    padding: "var(--size-xl)",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '91%',
};

interface ErrorBoundaryProps {
    children: ReactNode; // Define the children prop
}

interface ErrorBoundaryState {
    hasError: boolean;
    error?: Error;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('ErrorBoundary caught an error', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={tableContainerStyles}>
                    <Result
                        status="error"
                        title="There are some problems with your operation."
                        extra={
                            <Button type="primary" key="console">
                                Go Console
                            </Button>
                        }
                    />
                </div>
            );

        }

        return this.props.children;
    }
}

export default ErrorBoundary;
