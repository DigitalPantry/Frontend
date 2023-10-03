import apiClient from './apiClient';
import axios, { AxiosResponse, AxiosError } from 'axios';

const userController = 'userController';
const endpoint = {
    test: 'test',
    getUserById: 'getUserById',
}

interface userData {
    success: Boolean,
    message: String,
}

//Pre-API testing
const serverlessTest = async () => {
    try {
        const response = await axios.get(`https://www.cloudflare.com/cdn-cgi/trace`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError: AxiosError = error;
            console.error('Axios error:', axiosError);
        } else 
            console.error('Generic Error:', error);
    }
}

//Post-API testing
const helloWorld = async () => {
    try {
        const response: AxiosResponse<userData> = await axios.get<userData>(`/helloworld`);
        console.log(response);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError: AxiosError = error;
            console.error('Axios error:', axiosError);
        } else 
            console.error('Generic Error:', error);
    }
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

export { serverlessTest, helloWorld, getUserById };