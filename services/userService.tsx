import { AxiosResponse } from 'axios';
import apiClient from './apiClient';

const userController = 'userController';
const endpoint = {
    test: 'test',
    getUserById: 'getUserById',
}

//Post-API testing
const helloWorld = async () => {
    try {
        const response: AxiosResponse = await apiClient.get(`/helloworld`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

const loginUser = async (email: string, password: string) => {
    return { user: { firstName: 'Logan', lastName: 'Ellsworth', email: 'lellswo2@asu.edu', password: 'pass123' }, success: true, message: '' };
}

const logoutUser = async () => {
    return { success: true, message: '' };
}

const registerUser = async (firstName: string, lastName: string, email: string, password: string) => {
    return { user: {  }, success: true, message: '' };
}

//FUTURE USE EXAMPLE
const getUserById = async () => {
    try {
        const response = await apiClient.get(`/${userController}/${endpoint.getUserById}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export { helloWorld, getUserById, loginUser, logoutUser, registerUser };