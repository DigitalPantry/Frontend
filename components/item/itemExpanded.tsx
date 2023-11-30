import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableWithoutFeedback, Keyboard, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import styles from "../../global/styles";
import { Item } from "../../models/itemModels";
import Button from '../global/Button';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { itemFoundIn } from '../../global/constants';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';

interface Errors {
    name: boolean,
    category: boolean,
    expiration: boolean,
    quantity: boolean
}

interface Props {
    close: Function,
    submitItem: Function,
    itemType: String,
    item: Item,
}

const ItemExpanded: React.FC<Props> = ({ close, submitItem, itemType, item }) => {
    const [name, setName] = useState(item.name);
    const [category, setCategory] = useState(item.category);
    const [expiration, setExpiration] = useState<Date | undefined>(new Date(item.expiration || new Date()));
    const [quantity, setQuantity] = useState(item.quantity);

    const [errorMessage, setErrorMessage] = useState<string>("");
    const [errors, setErrors] = useState<Errors>({ name: false, category: false, expiration: false, quantity: false });

    const validate = () => {
        let foundErrors = false;

        if (!quantity || isNaN(+quantity) || +quantity < 0) {
            setErrorMessage("Please enter a valid quantity");
            setErrors((prevErrors) => ({ ...prevErrors, quantity: true }));
            foundErrors = true;
        }

        if (!name || name.length > 100) {
            setErrorMessage("Please enter a valid item name");
            setErrors((prevErrors) => ({ ...prevErrors, name: true }));
            foundErrors = true;
        }

        if (!category || category.length > 100) {
            setErrorMessage("Please enter a valid category");
            setErrors((prevErrors) => ({ ...prevErrors, category: true }));
            foundErrors = true;
        }

        return !foundErrors;
    }

    const handleSubmit = async () => {
        if (!validate())
            return;

        const item: Item = {
            name: name,
            category: category,
            expiration: expiration?.toString() || new Date().toString(),
            quantity: +quantity,
            found_in: itemFoundIn.INVENTORY,
            household_id: -1,
        }

        submitItem(item);
        close();
    };

    //Clear error on field change
    useEffect(() => {
        clearErrors();
    }, [name, category, expiration, quantity]);


    const clearErrors = () => {
        setErrorMessage("");
        setErrors({ name: false, category: false, expiration: false, quantity: false });
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={100}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <SafeAreaView>
                    <View style={{ ...styles.background, paddingLeft: '12%', paddingRight: '12%' }}>
                        <Text style={styles.headerText}>Edit Item</Text>
                        <View style={styles.inputRow}>
                            <Text style={styles.labelText}>Name:</Text>
                            <TextInput
                                style={errors.name ? styles.errorField : styles.textInput}
                                placeholder="Item Name"
                                onChangeText={setName}
                                value={name}
                                placeholderTextColor={'gray'} />
                        </View>
                        <View style={styles.inputRow}>
                            <Text style={styles.labelText}>Category:</Text>
                            <BottomSheetTextInput 
                                style={errors.category ? styles.errorField : styles.textInput}
                                placeholder="Category"
                                onChangeText={setCategory}
                                value={category}
                                placeholderTextColor={'gray'} />
                        </View>
                        <View style={styles.inputRow}>
                            <Text style={styles.labelText}>Quantity:</Text>
                            <BottomSheetTextInput
                                keyboardType='numeric'
                                style={errors.expiration ? styles.errorField : styles.textInput}
                                placeholder="Quantity"
                                onChangeText={value => setQuantity(Number(value))}
                                value={quantity.toString()}
                                placeholderTextColor={'gray'} />
                        </View>
                        {itemType == itemFoundIn.INVENTORY && <View style={styles.inputRow}>
                            <Text style={styles.labelText}>Expiration:</Text>
                            <RNDateTimePicker value={expiration || new Date()} onChange={(e, date) => setExpiration(date)} accentColor={'#C5A17C'} style={{ marginTop: '2%' }} />
                        </View>}
                        {errorMessage && <Text style={{ ...styles.errorText, marginTop: '5%' }}>{errorMessage}</Text>}
                        <View style={{ width: '100%', marginTop: '5%' }}>
                            <Button title={"Save Changes"} onPress={handleSubmit} />
                        </View>
                    </View>
                </SafeAreaView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default ItemExpanded;