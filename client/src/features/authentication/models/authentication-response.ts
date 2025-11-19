import type {User} from "./user.ts";

export interface AuthenticationResponse {
    client: User
    token: string
}