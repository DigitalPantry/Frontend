import { Recipe, RecipeResponse } from '../models/recipeModels';
import apiClient from './apiClient';

const UpsertRecipe = async (recipe: Recipe) => {
    try {
        const body = {
            ...recipe
        }

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

const GetRecipesByHousehold = async (household_id: number, name: string | null) => {
    try {
        let queryString = `/recipes?household_id=${household_id}`;

        if (name)
            queryString += `&name=${name}`

        const response = await apiClient.get(queryString);

        return response.data
    } catch (error) {
        throw error;
    }
}

const GenerateRecipe = async (household_id: number) => {
    try {
        let queryString = `recipes/ai?household_id=${household_id}`

        const response = await apiClient.get(queryString);

        return response.data;
    } catch (error) {
        throw error;
    }
}

export { UpsertRecipe, GetRecipesByHousehold, RemoveRecipe, GenerateRecipe }