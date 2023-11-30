import styles from "../global/styles";
import { ScrollView, TextInput, Image, Text, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform } from "react-native";
import { useRouter, Link } from 'expo-router';
import { useState, useEffect, useRef } from "react";
import Button from "../components/global/Button";
import { useSession } from "./context/auth";

interface Errors {
    email: boolean,
    password: boolean,
}

const Login: React.FC = () => {
    const { login } = useSession();
    const router = useRouter();
    const [email, onChangeEmail] = useState<string>("");
    const [password, onChangePassword] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [errors, setErrors] = useState<Errors>({ email: false, password: false });
    const passwordField = useRef<TextInput>(null);

    //Clear error on field change
    useEffect(() => {
        clearErrors();
    }, [email, password]);

    //Clears errors on data update
    const clearErrors = () => {
        setErrorMessage("");
        setErrors({ email: false, password: false });
    }

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

        return !foundErrors;
    }

    function delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    //Process data
    const processLogin = async () => {

        if (!validate())
            return

        const response = await login(email, password);
        if (response.success) {
            await delay(1000); //Temp fix hopefully something better later, isLoading not workng

            router.replace('/pantry');
        } else
            setErrorMessage(response.message);
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView style={styles.background}>
                    <Image source={require('../assets/DigitalPantryLogo.png')} style={{ height: 356, width: 219, alignSelf: "center", marginTop: '25%' }}></Image>
                    <TextInput
                        autoComplete="email"
                        style={errors.email ? styles.errorField : styles.textInput}
                        placeholder="Email"
                        onChangeText={onChangeEmail}
                        value={email}
                        onSubmitEditing={() => passwordField.current?.focus()} />
                    <TextInput
                        ref={passwordField}
                        autoComplete="current-password"
                        style={errors.password ? styles.errorField : styles.textInput}
                        placeholder="Password"
                        onChangeText={onChangePassword}
                        value={password}
                        onSubmitEditing={processLogin} />
                    {errorMessage && <Text style={{ ...styles.errorText, marginTop: '5%' }}>{errorMessage}</Text>}
                    <Button title="Login" onPress={() => processLogin()} />
                    <Link href='/signup' style={styles.link}>New? Register here.</Link>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default Login;