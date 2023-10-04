import apiClient from './apiClient';

const userController = 'userController';
const endpoint = {
    test: 'test',
    getUserById: 'getUserById',
}

interface userData {
    success: Boolean,
    message: String,
}

//Post-API testing
const helloWorld = async () => {
    try {
        const response: AxiosResponse<userData> = await apiClient.get<userData>(`/helloworld`);
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

export { userData, helloWorld, getUserById };