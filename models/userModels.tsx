interface LogoutResponse {
    success: boolean,
    message: string,
};

interface LoginResponse {
    user: object | null,
    success: boolean,
    message: string,
};

interface RegisterResponse {
    success: Boolean,
    message: String,
};

interface User {
    id: number,
    first_name: string,
    last_name: string,
    email: string,
    password: string,
}

export { LogoutResponse, LoginResponse, RegisterResponse, User };