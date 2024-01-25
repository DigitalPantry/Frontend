import React, { useState, useEffect } from 'react';
import { View, Text, TouchableWithoutFeedback, Keyboard, SafeAreaView, StyleSheet } from 'react-native';
import styles from "../../global/styles";
import { Recipe } from "../../models/recipeModels";
import Button from '../global/Button';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import colors from '../../global/colors';

interface Errors {
    name: boolean,
    ingredients: boolean,
    directions: boolean
}

interface Props {
    close: Function,
    submitRecipe: Function
}

const NewRecipe: React.FC<Props> = ({ close, submitRecipe }) => {
    const [name, setName] = useState("");
    const [ingredients, setIngredients] = useState<string[]>([]);
    const [directions, setDirections] = useState<string[]>([]);

    const [tempIngred, setTempIngred] = useState("");
    const [tempDirect, setTempDirect] = useState("");

    const [errorMessage, setErrorMessage] = useState<string>("");
    const [errors, setErrors] = useState<Errors>({ name: false, ingredients: false, directions: false });

    const validate = () => {
        let foundErrors = false;

        if (!name || name.length > 100) {
            setErrorMessage("Please enter a valid recipe name");
            setErrors((prevErrors) => ({ ...prevErrors, name: true }));
            foundErrors = true;
        }

        return !foundErrors;
    }

    const validateIngredient = () => {
        let foundErrors = false;

        if (!tempIngred || tempIngred.length > 100 || tempIngred.length < 1) {
            setErrorMessage("Please enter a valid ingredient name");
            setErrors((prevErrors) => ({ ...prevErrors, ingredients: true }));
            foundErrors = true;
        }

        return !foundErrors;
    }

    const validateDirection = () => {
        let foundErrors = false;

        if (!tempDirect || tempDirect.length > 100 || tempDirect.length < 1) {
            setErrorMessage("Please enter a valid direction");
            setErrors((prevErrors) => ({ ...prevErrors, directions: true }));
            foundErrors = true;
        }

        return !foundErrors;
    }

    const handleSubmit = async () => {
        if (!validate())
            return;

        const recipe: Recipe = {
            name: name,
            ingredients: ingredients,
            directions: directions,
            household_id: -1,
        }

        submitRecipe(recipe);
        close();
    };

    //Clear error on field change
    useEffect(() => {
        clearErrors();
    }, [name, ingredients, directions]);


    const clearErrors = () => {
        setErrorMessage("");
        setErrors({ name: false, ingredients: false, directions: false });
    };

    const handleAddIngredients = () => {
        if (!validateIngredient())
            return;

        setIngredients((prevIngredients) => [...prevIngredients, tempIngred]);
        setTempIngred("");
    };

    const handleAddDirections = () => {
        if (!validateDirection())
            return;

        setDirections((prevDirections) => [...prevDirections, tempDirect]);
        setTempDirect("");
    };

    const handleRemoveIngredients = (indexToRemove: number) => {
        const newIngredients = ingredients.filter((_, index) => index !== indexToRemove);
        setIngredients(newIngredients)
    }

    const handleRemoveDirections = (indexToRemove: number) => {
        const newDirections = directions.filter((_, index) => index !== indexToRemove);
        setDirections(newDirections)
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={styles.background}>
                <View style={{ ...styles.background, paddingLeft: '12%', paddingRight: '12%' }}>
                    <Text style={styles.headerText}>Create Recipe</Text>
                    <View style={{ ...styles.inputRow, flexDirection: 'column' }}>
                        <Text style={{ ...styles.labelText, alignSelf: 'center', paddingTop: '2%' }}>Name</Text>
                        <BottomSheetTextInput
                            style={errors.name ? styles.errorField : { ...styles.textInput, width: '100%' }}
                            placeholder="Recipe Name"
                            onChangeText={setName}
                            value={name}
                            placeholderTextColor={'gray'} />
                    </View>
                    <Text style={{ ...styles.labelText, alignSelf: 'center', paddingTop: '2%' }}>Ingredients</Text>
                    {ingredients?.map((item, index) => (
                        <View key={index} style={localStyles.itemRow}>
                            <Text style={{ fontSize: 16 }}>{item}</Text>
                            <Button
                                title="-"
                                onPress={() => handleRemoveIngredients(index)}
                                size="small" />
                        </View>
                    ))}
                    <View style={styles.inputRow}>
                        <BottomSheetTextInput
                            style={errors.ingredients ? styles.errorField : { ...styles.textInput, width: '85%' }}
                            placeholder="Add ingredient"
                            onChangeText={setTempIngred}
                            value={tempIngred}
                            placeholderTextColor={'gray'} />
                        <Button
                            title="+"
                            onPress={handleAddIngredients}
                            size="small" />
                    </View>
                    <Text style={{ ...styles.labelText, alignSelf: 'center', paddingTop: '2%' }}>Directions</Text>
                    {directions?.map((item, index) => (
                        <View key={index} style={localStyles.itemRow}>
                            <Text style={{ fontSize: 16 }}>{item}</Text>
                            <Button
                                title="-"
                                onPress={() => handleRemoveDirections(index)}
                                size="small" />
                        </View>
                    ))}
                    <View style={styles.inputRow}>
                        <BottomSheetTextInput
                            style={errors.directions ? styles.errorField : { ...styles.textInput, width: '85%', minHeight: 100 }}
                            multiline
                            numberOfLines={4}
                            placeholder="Add step"
                            onChangeText={setTempDirect}
                            value={tempDirect}
                            placeholderTextColor={'gray'} />
                        <Button
                            title="+"
                            onPress={handleAddDirections}
                            size="small" />
                    </View>
                    {errorMessage && <Text style={{ ...styles.errorText, marginTop: '5%' }}>{errorMessage}</Text>}
                    <View style={{ width: '100%', marginTop: '5%', marginBottom: '5%' }}>
                        <Button title={"Create Recipe"} onPress={handleSubmit} />
                    </View>
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

const localStyles = StyleSheet.create({
    itemRow: {
        backgroundColor: colors.secondary,
        borderRadius: 20,
        padding: 10,
        marginTop: 5,
        height: 50,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        widht: '100%',

    }
});

export default NewRecipe;