import React from "react";
import colors from "../../global/colors";
import { SafeAreaView, StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { Recipe } from "../../models/recipeModels";

interface RecipeListViewProps {
    recipe: Recipe;
    expandedRecipe: Function;
}

const RecipeListView: React.FC<RecipeListViewProps> = ({recipe, expandedRecipe}) => {
    return (
        <SafeAreaView>
            <TouchableOpacity style={recipeStyle.recipeNonExpand} onPress={() => expandedRecipe(recipe)}>
                <View style={{ display: 'flex', flexDirection: 'column', justifyContent:'center' }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{recipe.name}</Text>
                    <Text>DESCRIPTION_HERE</Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'column', justifyContent:'center' }}>
                    <Text style={{ alignSelf: 'center' }}>Serves: </Text>
                    <Text style={{ alignSelf: 'center' }}>Time: </Text>
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const recipeStyle = StyleSheet.create({
    recipeNonExpand: {
        width: '93%',
        height: 70,
        backgroundColor: colors.primary,
        alignSelf: 'center',
        borderRadius: 8,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        marginBottom: 5,
    },
    quantity: {
        width: 40,
        height: 70,
        backgroundColor: colors.secondary,
        borderRadius: 30,
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 5,
        marginLeft: 20,
    },
})

export default RecipeListView;