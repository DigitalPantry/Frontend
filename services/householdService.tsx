import { Household } from '../models/householdModels';
import { User } from '../models/userModels';
import apiClient from './apiClient';

const getHouseholdById = async (id: number) => {
    try {
        const response = await apiClient.get(`/household/users?id=${id}`);

        return response.data

    } catch (error) {
        throw error
    }
}

const addNewHHMember = async (user: User) => {
    try {
        const response = await apiClient.post('/users/newMember', user)

        return response.data
    } catch (error) {
        throw error
    }
}

const removeHHMember = async (uid: number, houseId: number) => {
    try {
        const response = await apiClient.delete(`/household/users?idString=${uid}&houseId=${houseId}`)

        return response.data
    } catch (error) {
        throw error
    }
}

export { getHouseholdById, addNewHHMember, removeHHMember };