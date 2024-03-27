import { Button } from "antd";
import { ComponentType, FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth-provider/auth-provider";

const NotAuthenticatedComponent = <P extends object>(WrappedComponent: ComponentType<P>): FC<P> => {
    const WithNotAuthenticationCheck: FC<P> = (props) => {
        const navigate = useNavigate();
        const { user } = useAuth();
        const [error, setError] = useState<string | null>(null);

        useEffect(() => {
            try {
                if (user) {
                    navigate('/');
                }
            } catch (err) {
                console.error(err);
                setError("An error occurred while checking user roles.");
            }
        }, [navigate, user]);

        if (error) {
            return (
                <div>
                    <p>An error occurred. Please try again later.</p>
                    {/* Button to go back */}
                    <Button onClick={() => navigate(-1)}>Go Back</Button>
                </div>
            );
        }

        return <WrappedComponent {...props} />;
    };

    return WithNotAuthenticationCheck;
};

export default NotAuthenticatedComponent;
