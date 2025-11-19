// context/AuthContext.tsx
import {createContext, useContext, useState, useEffect, type ReactNode} from 'react';
import type {User} from "../models/user.ts";
import type {LoginRequest, RegisterRequest} from "../models/authentication-requests.ts";
import {authService} from "../services/authentication-service.ts";

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (data: LoginRequest) => Promise<void>;
    register: (data: RegisterRequest) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const initializeAuth = () => {
            const hasToken = authService.isAuthenticated();
            if (hasToken) {
                setIsAuthenticated(true);
                // OPTIONAL: Ideally, you would fetch the user profile here
                // await api.get('/auth/me').then(setUser)...
                // For this demo, we assume if token exists, we are auth'd.
            }
            setIsLoading(false);
        };

        initializeAuth();
    }, []);

    const login = async (data: LoginRequest) => {
        try {
            const response = await authService.login(data);
            setUser(response.client);
            setIsAuthenticated(true);
        } catch (error) {
            throw error;
        }
    };

    const register = async (data: RegisterRequest) => {
        try {
            const response = await authService.register(data);
            setUser(response.client);
            setIsAuthenticated(true);
        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        authService.logout();
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
};