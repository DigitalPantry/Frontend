import styles from "../global/styles";
import { SafeAreaView, TextInput, Image, Text, TouchableWithoutFeedback, Keyboard, View, Platform, KeyboardAvoidingView } from "react-native";
import { useRouter, Link } from 'expo-router';
import { useState, useEffect, useRef } from "react";
import Button from "../components/global/Button";
import { User } from "../models/userModels";
import { useSession } from "./context/auth";
import { ScrollView } from "react-native-gesture-handler";

interface Errors {
    first: boolean,
    last: boolean,
    email: boolean,
    password: boolean,
}

const Signup: React.FC = () => {
    const { register } = useSession();
    const router = useRouter();
    const [first_name, onChangeFirstName] = useState<User["first_name"]>("");
    const [last_name, onChangeLastName] = useState<User["last_name"]>("");
    const [email, onChangeEmail] = useState<User["email"]>("");
    const [password, onChangePassword] = useState<User["password"]>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [errors, setErrors] = useState<Errors>({ first: false, last: false, email: false, password: false });
    const lastField = useRef<TextInput>(null);
    const emailField = useRef<TextInput>(null);
    const passwordField = useRef<TextInput>(null);

    //Clear error on field change
    useEffect(() => {
        clearErrors();
    }, [first_name, last_name, email, password]);

    //Clears errors on data update
    const clearErrors = () => {
        setErrorMessage("");
        setErrors({ first: false, last: false, email: false, password: false });
    }

    //Checks if errors set
    const hasErrors = () => { return Object.values(errors).some((value) => value === true) };

    //Validate data
    const validate = () => {
        let foundErrors = false;

        if (!password || password.length > 100) {
            setErrorMessage("Please enter a valid password.");
            setErrors((prevErrors) => ({ ...prevErrors, password: true }));
            foundErrors = true;
        }
        if (!email || email.length > 100) {
            setErrorMessage("Please enter a valid email.");
            setErrors((prevErrors) => ({ ...prevErrors, email: true }));
            foundErrors = true;
        }
        if (!last_name || last_name.length > 100) {
            setErrorMessage("Please enter a valid last name.");
            setErrors((prevErrors) => ({ ...prevErrors, last: true }));
            foundErrors = true;
        }
        if (!first_name || first_name.length > 100) {
            setErrorMessage("Please enter a valid first name.");
            setErrors((prevErrors) => ({ ...prevErrors, first: true }));
            foundErrors = true;
        }

        return !foundErrors;
    }

    function delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    //Process data
    const processRegister = async () => {

        if (!validate())
            return

        await register({ first_name, last_name, email, password, house_owner: 1 });
        await delay(1000); //Temp fix hopefully something better later, isLoading not workng

        router.replace('/pantry');
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView style={styles.background} automaticallyAdjustKeyboardInsets={true}>
                    <View style={{ height: 218, width: 218, alignSelf: "center", justifyContent: 'center', marginTop: '15%' }}>
                        <Image source={require('../assets/PantryLogoNoText.png')} style={{ alignSelf: 'center', resizeMode: 'contain' }}></Image>
                    </View>
                    <Text style={styles.headerText}>Create your account</Text>
                    <TextInput
                        autoComplete="given-name"
                        style={errors.first ? styles.errorField : styles.textInput}
                        placeholder="First Name"
                        onChangeText={onChangeFirstName}
                        value={first_name}
                        onSubmitEditing={() => lastField.current?.focus()} />
                    <TextInput
                        ref={lastField}
                        autoComplete="family-name"
                        style={errors.last ? styles.errorField : styles.textInput}
                        placeholder="Last Name"
                        onChangeText={onChangeLastName}
                        value={last_name}
                        onSubmitEditing={() => emailField.current?.focus()} />
                    <TextInput
                        ref={emailField}
                        autoComplete="email"
                        autoCapitalize="none"
                        style={errors.email ? styles.errorField : styles.textInput}
                        placeholder="Email"
                        onChangeText={onChangeEmail}
                        value={email}
                        onSubmitEditing={() => passwordField.current?.focus()} />
                    <TextInput
                        ref={passwordField}
                        autoComplete="new-password"
                        autoCapitalize="none"
                        style={errors.password ? styles.errorField : styles.textInput}
                        placeholder="Password"
                        onChangeText={onChangePassword}
                        value={password}
                        onSubmitEditing={processRegister} />
                    {errorMessage && <Text style={{ ...styles.errorText, marginTop: '5%' }}>{errorMessage}</Text>}
                    <Button title="Register" onPress={processRegister} />
                    <Link href='/login' style={styles.link}>Back</Link>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default Signup;