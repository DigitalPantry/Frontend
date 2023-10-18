import styles from "../global/styles";
import { ScrollView, TextInput, Image, Text, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform } from "react-native";
import { useRouter, Link } from 'expo-router';
import { useState, useEffect, useRef } from "react";
import Button from "../components/Button";
// import { useSession } from "./context/auth";

interface Errors {
    email: boolean,
    password: boolean,
}

const Login: React.FC = () => {
    // const { login } = useSession();
    const router = useRouter();
    const [email, onChangeEmail] = useState<string>("");
    const [password, onChangePassword] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [errors, setErrors] = useState<Errors>({ email: false, password: false});
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
    
    //Checks if errors set
    const hasErrors = () => {return Object.values(errors).some((value) => value === true)};

    //Validate data
    const validate = () => {
        if (!password || password.length > 100) {
            setErrorMessage("Please enter a valid password.");
            setErrors((prevErrors) => ({...prevErrors, password: true}));
        }
        if (!email || email.length > 100) {
            setErrorMessage("Please enter a valid email.");
            setErrors((prevErrors) => ({...prevErrors, email: true}));
        }
        return !hasErrors();
    }

    //Process data
    const login = () => {
        //LOCALTESTING disabled
        // if (validate()) { return; }
        console.log(`LOGIN-API-CALL - ${email} ${password}`);
        router.replace('/pantry');
    }

    return (
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
                    onSubmitEditing={login} />
                {errorMessage && <Text style={{ ...styles.errorText, marginTop: '5%' }}>{errorMessage}</Text>}
                <Button title="Login" onPress={() => login()} />
                <Link href='/signup' style={styles.link}>New? Register here.</Link>
            </ScrollView>
        </TouchableWithoutFeedback>
    )
}

export default Login;