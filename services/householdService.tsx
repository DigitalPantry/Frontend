import { Household } from '../models/householdModels';
import apiClient from './apiClient';

const getHouseholdById = async (id: number) => {
    try {
        const response = await apiClient.get(`/household/users?id=${id}`);

        return response.data

    } catch (error) {
        throw error
    }
}

export { getHouseholdById };