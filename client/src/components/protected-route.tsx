import {useAuth} from "@/features/authentication/context/auth-context.tsx";
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = () => {
    const {isAuthenticated, isLoading} = useAuth();

    if (isLoading) {
        return <div>Loading...</div>; // Or a spinner component
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace/>;
    }

    return <Outlet/>;
};