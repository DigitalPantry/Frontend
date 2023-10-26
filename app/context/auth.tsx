import React from 'react';
import { LoginResponse, LogoutResponse, RegisterResponse, User } from '../../models/userModels';
import { loginUser, logoutUser, registerUser } from '../../services/userService';
import { useStorageState } from './useStorageState';

interface AuthContextValue {
    login: (e: string, p: string) => Promise<LoginResponse>;
    logout: () => Promise<LogoutResponse>;
    register: (u: User) => Promise<RegisterResponse>;
    session: string | null,
    isLoading: boolean,
    user: User,
}

const AuthContext = React.createContext<AuthContextValue | null>(null);

export function useSession() {
    const value = React.useContext(AuthContext);

    if (!value) {
        throw new Error('useSession must be wrapped in a <SessionProvider />');
    }

    return value;
}

export function SessionProvider(props: any) {
    const [[isLoading, session], setSession] = useStorageState('session');
    //With current implementation, user object is cleared after every app hot refresh due to it using state and not storage.
    //To avoid issues, use ID numbers present within your database if you want to avoid re-logging in everytime when testing.
    const [user, setAuth] = React.useState<User>({id: 1, first_name: 'DEV', last_name: 'TESTING', email: 'TESTING@TEST.COM', household_id: 1});

    const logout = async (): Promise<LogoutResponse> => {
        try {
            const response = await logoutUser();

            console.log(`Logout & Clear Session: Response=${response.message}`);

            return response;
        } catch (error) {
            return { success: false, message: 'An error occured calling logoutUser.' }
        } finally {
            setSession(null);
        }
    };

    const login = async (email: string, password: string): Promise<LoginResponse> => {
        try {
            const response = await loginUser(email, password);

            if (response.success == true) {
                console.log(`Setting session: UserID=${response?.user?.id}. Response=${response.message}`);
            console.log(response.user);
                setAuth(response.user);
                setSession(JSON.stringify(response.user)); //Eventually could/should be replaced with JWT sessions db
            }

            return response;
        } catch (error) {
            return { user: {}, success: false, message: 'An error occured calling loginUser.' }
        }
    };

    const register = async (user: User): Promise<RegisterResponse> => {
        try {
            const response = await registerUser(user);

            if (response.success == true) {
                console.log(`Registered & Setting session: UserID=${response?.user?.id}. Response=${response.message}`);

                setAuth(response.user);
                setSession(JSON.stringify(response.user)); //Eventually could/should be replaced with JWT sessions db
            }

            return response;
        } catch (error) {
            return { success: false, message: 'An error occured during calling registerUser.' }
        }
    };

    return (
        <AuthContext.Provider
            value={{
                login: login,
                logout: logout,
                register: register,
                session,
                isLoading,
                user,
            }}>
            {props.children}
        </AuthContext.Provider>
    );
}
