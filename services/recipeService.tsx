import { Recipe, RecipeResponse } from '../models/recipeModels';
import apiClient from './apiClient';

const UpsertRecipe = async (recipe: Recipe) => {
    try {
        const body = {
            ...recipe
        }
console.log(body)
        const response = await apiClient.post(`/recipes`, body);

        return response.data

    } catch (error) {
        throw error
    }
}

const RemoveRecipe = async (id: number) => {
    try {
        const response = await apiClient.delete(`/recipes?idString=${id}`);

        return response.data
    } catch (error) {
        throw error;
    }
}

const GetRecipesByHousehold = async (household_id: number) => {
    try {
        const response = await apiClient.get(`/recipes?household_id=${household_id}`);

        return response.data
    } catch (error) {
        throw error;
    }
}

export { UpsertRecipe, GetRecipesByHousehold, RemoveRecipe }