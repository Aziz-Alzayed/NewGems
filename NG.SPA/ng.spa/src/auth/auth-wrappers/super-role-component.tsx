import { Button } from "antd";
import { ComponentType, FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth-provider/auth-provider";
import { isSuper } from "../auth-services/auth-service";

const SuperRoleComponent = <P extends object>(WrappedComponent: ComponentType<P>): FC<P> => {
    const WithSuperRoleCheck: FC<P> = (props) => {
        const navigate = useNavigate();
        const { user } = useAuth();
        const [error, setError] = useState<string | null>(null);

        useEffect(() => {
            const checkRoles = async () => {
                try {
                const isAllowed = await isSuper();
                if (!isAllowed) {
                    navigate('/unauthorized');
                    }
                } catch (err) {
                    console.error(err);
                    setError("An error occurred while checking user roles.");
                }
            };
            checkRoles();
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

    return WithSuperRoleCheck;
};

export default SuperRoleComponent;
