interface Recipe {
    id?: number,
    name: string,
    household_id?: number,
    ingredients: Array<string>,
    directions: Array<string>,
}

interface RecipeResponse {
    success: boolean,
    message: string,
    recipes?: Recipe[],
};

export { Recipe, RecipeResponse };