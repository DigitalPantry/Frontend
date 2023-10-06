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

export { LogoutResponse, LoginResponse, RegisterResponse };