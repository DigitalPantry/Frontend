import { useRootNavigation, useRouter, useSegments } from 'expo-router';
import React, { useState } from 'react';
import { LogoutResponse, LoginResponse, RegisterResponse } from '../../models/userModels';
import { loginUser, logoutUser, registerUser } from '../../services/userService';

interface AuthContextValue {
    login: (e: string, p: string) => Promise<LoginResponse>;
    logout: () => Promise<LogoutResponse>;
    register: (f: string, l: string, e: string, p: string) => Promise<RegisterResponse>;
    user: object | null,
}

const AuthContext = React.createContext<AuthContextValue | undefined>(undefined);

export function Provider(props: any) {
    const [user, setAuth] = React.useState<object | null>(null);
    const [authInitialized, setAuthInitialized] = React.useState<boolean>(true);
    
    const useProtectedRoute = (user: object | null) => {
        const segments = useSegments();
        const router = useRouter();
        const [isNavigationReady, setNavigationReady] = useState(false);
        const rootNavigation = useRootNavigation();
    
        React.useEffect(() => {
            const unsubscribe = rootNavigation?.addListener("state", (event) => {
                setNavigationReady(true);
            });
            return function cleanup() {
                if (unsubscribe) {
                    unsubscribe();
                }
            };
        }, [rootNavigation]);
    
        React.useEffect(() => {
            if (!isNavigationReady) {
                return;
            }

            const inAuthGroup = segments[0] === '(auth)';

            if (!authInitialized) return;
    
            if (!user && !inAuthGroup) {
                router.replace('/login');
            } else if (user && inAuthGroup) {
                router.replace('/');
            }
        }, [user, segments, authInitialized, isNavigationReady]);
    };
    
    // React.useEffect(() => {
    //     (async () => {
    //         try {

    //         }
    //     })();
    // }, []);

    const logout = async (): Promise<LogoutResponse> => {
        try {
            const response = await logoutUser();
            return response;
        } catch (error) {
            return { success: false, message: 'An error occured calling logoutUser.' }
        } finally {
            setAuth(null);
        }
    };
    
    const login = async (email: string, password: string): Promise<LoginResponse> => {
        try {
            const response = await loginUser(email, password);
            setAuth(response.user);
            return response;
        } catch (error) {
            return { user: {}, success: false, message: 'An error occured calling loginUser.' }
        } 
    };
    
    const register = async (firstName: string, lastName: string, email: string, password: string): Promise<RegisterResponse> => {
        try {
            const response = await registerUser(firstName, lastName, email, password);
            setAuth(response.user);
            return response;
        } catch (error) {
            return { success: false, message: 'An error occured during calling registerUser.'}
        }
    };

    useProtectedRoute(user);

    return (
        <AuthContext.Provider
            value={{
                login: login,
                logout: logout,
                register: register,
                user,
            }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const authContext = React.useContext(AuthContext);

    if (!authContext) {
        throw new Error("useAuth must be used within AUthContextProvider");
    }

    return authContext;
};