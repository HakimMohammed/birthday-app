interface LoginRequest {
    email: string,
    password: string
}

interface RegisterRequest {
    email: string,
    password: string,
    name: string
}

export type {LoginRequest, RegisterRequest}