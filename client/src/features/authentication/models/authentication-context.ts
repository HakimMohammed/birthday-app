import type {LoginRequest} from "./authentication-requests.ts";

export interface AuthenticationContext {
    login: (request: LoginRequest) => boolean;
    logout: () => void;
}