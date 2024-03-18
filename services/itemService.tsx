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

const GetItemsByHousehold = async (household_id: number, found_in: string, name: string | null, category: string | null, expiresBefore: Date | null, minQuantity: string | null) => {
    try {
        let queryString = `/items?household_id=${household_id}&found_in=${found_in}`;

        if (name)
            queryString += `&name=${name}`
        if (category)
            queryString += `&category=${category}`
        if (expiresBefore)
            queryString += `&expiresBefore=${expiresBefore.toISOString()}`
        if (minQuantity)
            queryString += `&minQuantity=${minQuantity}`

        const response = await apiClient.get(queryString);

        return response.data
    } catch (error) {
        throw error;
    }
}

export { UpsertItem, GetItemsByHousehold, RemoveItem }