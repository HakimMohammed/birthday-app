import api from "@/utils/api.ts";
import type {LoginRequest, RegisterRequest} from "../models/authentication-requests.ts";
import type {AuthenticationResponse} from "../models/authentication-response.ts";

// Helper to set token
const setToken = (token: string) => {
    localStorage.setItem('accessToken', token);
};

// Helper to remove token
const removeToken = () => {
    localStorage.removeItem('accessToken');
};

export const authService = {

    register: async (data: RegisterRequest): Promise<AuthenticationResponse> => {
        try {
            const response = await api.post<AuthenticationResponse>('/auth/register', data);

            if (response.data.token) {
                setToken(response.data.token);
            }

            return response.data;
        } catch (error) {
            console.log(error)
            throw error;
        }
    },

    login: async (data: LoginRequest): Promise<AuthenticationResponse> => {
        try {
            const response = await api.post<AuthenticationResponse>('/auth/login', data);

            if (response.data.token) {
                setToken(response.data.token);
            }

            return response.data;
        } catch (error) {
            console.log(error)
            throw error;
        }
    },

    logout: () => {
        removeToken();
    },

    isAuthenticated: (): boolean => {
        return !!localStorage.getItem('accessToken');
    }
};