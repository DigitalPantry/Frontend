import { User } from '../models/userModels';
import apiClient from './apiClient';

const loginUser = async (email: string, password: string) => {
    try {
        const body = {
            "email": email,
            "password": password
        }

        const response = await apiClient.post(`/login`, body);

        return response.data

    } catch (error) {
        throw error
    }
}

const logoutUser = async () => { //Not needed until/if add JWT sessions db
    return { success: true, message: 'LOGOUT-API-DUMMY' };
}

const registerUser = async (user: User) => {
    try {
        const response = await apiClient.post(`/users`, user);

        return response.data

    } catch (error) {
        throw error
    }
}

const updateUser = async (user: User) => {
    try {
        const response = await apiClient.post(`/users/UpdateUser`, user);

        return response.data

    } catch (error) {
        throw error
    }
}

export { loginUser, logoutUser, registerUser, updateUser };