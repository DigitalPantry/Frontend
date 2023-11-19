import { Item, ItemResponse } from '../models/itemModels';
import apiClient from './apiClient';

const UpsertItem = async (item: Item) => {
    try {
        const body = {
            ...item
        }

        const response = await apiClient.post(`/items`, body);

        return response.data

    } catch (error) {
        throw error
    }
}

const RemoveItem = async (id: number) => {
    try {
        const response = await apiClient.delete(`/items?idString=${id}`);

        return response.data
    } catch (error) {
        throw error;
    }
}

const GetItemsByHousehold = async (household_id: number, found_in: string) => {
    try {
        const response = await apiClient.get(`/items?household_id=${household_id}&found_in=${found_in}`);

        return response.data
    } catch (error) {
        throw error;
    }
}

export { UpsertItem, GetItemsByHousehold, RemoveItem }