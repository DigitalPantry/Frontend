import apiClient from './apiClient';

const userController = 'userController';
const endpoint = {
    test: 'test',
    getUserById: 'getUserById',
}

//Pre-API testing
import axios from 'axios';
const serverlessTest = async () => {
    try {
        const response = await axios.get(`https://www.cloudflare.com/cdn-cgi/trace`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

//Post-API testing
const helloWorld = async () => {
    try {
        const response = await apiClient.get(`/${userController}/${endpoint.test}`);
        return response.data;
    } catch (error) {
        throw error;
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