import { Item, ItemResponse } from '../models/itemModels';
import apiClient from './apiClient';

export const CreateItem = async (item: Item) => {
    try {
        const body = {
            "name": item.name,
            "category": item.category,
            "expiration": item.expiration,
            "quantity": item.quantity,
            "household_id": item.household_id,
            "found_in": item.found_in
        }

        const response = await apiClient.post(`/items`, body);

        return response.data

    } catch (error) {
        throw error
    }
}
