import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableWithoutFeedback, Keyboard, SafeAreaView} from 'react-native';
import styles from "../../../global/styles";
import { useRouter, Link } from 'expo-router';
import {Button} from 'react-native-elements';
import colors from "../../../global/colors";
import { Item, ItemResponse } from "../../../models/itemModels";
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import { CreateItem } from '../../../services/itemService';
import { useSession } from "../../context/auth";

interface Errors {
    name: boolean,
    category: boolean,
    expiration: boolean,
    quantity: boolean
}

export default function FormPage() {
  const { user } = useSession();
  
  const router = useRouter();
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [expiration, setExpiration] = useState(dayjs());
  const [quantity, setQuantity] = useState('');
  
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errors, setErrors] = useState<Errors>({ name: false, category: false, expiration: false, quantity: false });
  
  const categoryField = useRef<TextInput>(null);
  const quantityField = useRef<TextInput>(null);
  const expirationField = useRef(null);
  
  const hasErrors = () => {return Object.values(errors).some((value) => value === true)};
  
  const validate = () => {
    if (!quantity || isNaN(+quantity) || +quantity < 0 ) {
      setErrorMessage("Please enter a valid quantity");
      setErrors((prevErrors) => ({...prevErrors, quantity: true}));
    }
    
    if (!name || name.length > 100 ) {
      setErrorMessage("Please enter a valid item name");
      setErrors((prevErrors) => ({...prevErrors, name: true}));
    }
    
    if (!expiration) {
      setErrorMessage("Please enter a valid expiration");
      setErrors((prevErrors) => ({...prevErrors, expiration: true}));
    }
    
    if (!category || category.length > 100) {
      setErrorMessage("Please enter a valid category");
      setErrors((prevErrors) => ({...prevErrors, category: true}));
    }
    return hasErrors();
  }

  const handleSubmit = async () => {
    if(validate()) {
      return;
    }
    
    const item: Item = {
      name: name,
      category: category,
      expiration: expiration.toISOString(),
      quantity: +quantity,
      found_in: "Inventory",
      household_id: user.household_id
    }
    
    const res = await CreateItem(item)
    
    router.replace("/pantry");
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.background}>
            <Text style={styles.headerText}>Add Pantry Item</Text>
            <TextInput
                style={errors.name ? styles.errorField : styles.textInput}
                placeholder="Item Name"
                onChangeText={setName}
                value={name}
                onSubmitEditing={() => categoryField.current?.focus()} />
            <TextInput
                ref={categoryField}
                style={errors.category ? styles.errorField : styles.textInput}
                placeholder="Category"
                onChangeText={setCategory}
                value={category}
                onSubmitEditing={() => quantityField.current?.focus()} />
            <TextInput
                keyboardType='numeric'
                ref={quantityField}
                style={errors.expiration ? styles.errorField : styles.textInput}
                placeholder="Quantity"
                onChangeText={setQuantity}
                value={quantity}
                onSubmitEditing={() => quantityField.current?.focus()} />
            <View style={styles.container}>
              <DateTimePicker
                value={expiration}
                mode="date"
                onValueChange={(date) => setExpiration(dayjs(date))}
              />
            </View>
            {errorMessage && <Text style={{ ...styles.errorText, marginTop: '5%' }}>{errorMessage}</Text>}
            <View style={{margin: 15, alignItems: 'center', justifyContent: 'center'}}>
                <Button title="Add Item" titleStyle={{ color: colors.primaryText }}buttonStyle={{borderRadius: 5, backgroundColor: colors.active }} onPress={handleSubmit} />
            </View>
            <Link href='/pantry' style={styles.link}>Back</Link>
        </SafeAreaView>
    </TouchableWithoutFeedback>
)
}
