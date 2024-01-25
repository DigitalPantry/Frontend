import React, { useState, useEffect } from 'react';
import { View, Text, TouchableWithoutFeedback, Keyboard, SafeAreaView } from 'react-native';
import styles from "../../global/styles";
import { Item } from "../../models/itemModels";
import Button from '../global/Button';
import { itemFoundIn } from '../../global/constants';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { useSession } from "../../app/context/auth"

interface Errors {
    name: boolean,
    category: boolean,
    expiration: boolean,
    quantity: boolean
    units: false
}

interface Props {
    close: Function,
    submitItem: Function,
    itemType: String,
}

const NewItem: React.FC<Props> = ({ close, submitItem, itemType }) => {
    const { user } = useSession();
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [expiration, setExpiration] = useState<Date | undefined>(new Date());
    const [quantity, setQuantity] = useState('');
    const [units, setUnits]= useState('Grams');

    const [errorMessage, setErrorMessage] = useState<string>("");
    const [errors, setErrors] = useState<Errors>({ name: false, category: false, expiration: false, quantity: false, units: false });

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
            units: units,
            expiration: expiration?.toDateString(),
            quantity: +quantity,
            found_in: "Inventory",
            household_id: user.household_id,
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
        setErrors({ name: false, category: false, expiration: false, quantity: false, units: false });
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={styles.background}>
                <View style={{ ...styles.background, paddingLeft: '12%', paddingRight: '12%' }}>
                    <Text style={styles.headerText}>{itemType == itemFoundIn.LIST ? 'Add List Item' : 'Add Pantry Item'}</Text>
                    <View style={styles.inputRow}>
                        <Text style={styles.labelText}>Name:</Text>
                        <BottomSheetTextInput
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
                            style={errors.quantity ? styles.errorField : styles.textInput}
                            placeholder="Quantity"
                            onChangeText={setQuantity}
                            value={quantity}
                            placeholderTextColor={'gray'} />
                    </View>
                    <View style={styles.inputRow}>
                        <Text style={styles.labelText}>Units:</Text>
                        <BottomSheetTextInput
                            style={errors.units ? styles.errorField : styles.textInput}
                            placeholder="Units"
                            onChangeText={setUnits}
                            value={units}
                            placeholderTextColor={'gray'} />
                    </View>
                    {itemType == itemFoundIn.INVENTORY && <View style={styles.inputRow}>
                        <Text style={styles.labelText}>Expiration:</Text>
                        <RNDateTimePicker value={expiration || new Date()} onChange={(e, date) => setExpiration(date)} accentColor={'#C5A17C'} />
                    </View>}
                    {errorMessage && <Text style={{ ...styles.errorText, marginTop: '5%' }}>{errorMessage}</Text>}
                    <View style={{ width: '100%', marginTop: '5%' }}>
                        <Button title={"Add Item"} onPress={handleSubmit} />
                    </View>
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

export default NewItem;