// import React from 'react';
// import { LoginResponse, LogoutResponse, RegisterResponse } from '../../models/userModels';
// import { loginUser, logoutUser, registerUser } from '../../services/userService';
// import { useStorageState } from './useStorageState';


// interface AuthContextValue {
//     login: (e: string, p: string) => Promise<LoginResponse>;
//     logout: () => Promise<LogoutResponse>;
//     register: (f: string, l: string, e: string, p: string) => Promise<RegisterResponse>;
//     session: string | null,
//     isLoading: boolean,
// }

// const AuthContext = React.createContext<AuthContextValue | null>(null);

// export function useSession() {
//     const value = React.useContext(AuthContext);

//     if (!value) {
//         throw new Error('useSession must be wrapped in a <SessionProvider />');
//     }

//     return value;
// }

// export function SessionProvider(props: any) {
//     const [[isLoading, session], setSession] = useStorageState('session');
//     const [user, setAuth] = React.useState<object | null>(null);

//     const logout = async (): Promise<LogoutResponse> => {
//         try {
//             const response = await logoutUser();
//             return response;
//         } catch (error) {
//             return { success: false, message: 'An error occured calling logoutUser.' }
//         } finally {
//             setSession(null);
//         }
//     };

//     const login = async (email: string, password: string): Promise<LoginResponse> => {
//         try {
//             const response = await loginUser(email, password);
//             setSession(JSON.stringify(response.user));
//             return response;
//         } catch (error) {
//             return { user: {}, success: false, message: 'An error occured calling loginUser.' }
//         }
//     };

//     const register = async (firstName: string, lastName: string, email: string, password: string): Promise<RegisterResponse> => {
//         try {
//             const response = await registerUser(firstName, lastName, email, password);
//             setSession(JSON.stringify(response.user));
//             return response;
//         } catch (error) {
//             return { success: false, message: 'An error occured during calling registerUser.' }
//         }
//     };

//     return (
//         <AuthContext.Provider
//             value={{
//                 login: login,
//                 logout: logout,
//                 register: register,
//                 session,
//                 isLoading,
//             }}>
//             {props.children}
//         </AuthContext.Provider>
//     );
// }
