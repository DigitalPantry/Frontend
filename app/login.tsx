import styles from "../global/styles";
import { Pressable, SafeAreaView, TextInput, Image, Text, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useRouter } from 'expo-router';
import { useState } from "react";
// import { useSession } from "./context/auth";

const Login: React.FC = () => {
    // const { login } = useSession();
    const router = useRouter();
    const [email, onChangeEmail] = useState<string>("");
    const [password, onChangePassword] = useState<string>("");
    const login = (email: string, password: string) => {
        console.log("LOGIN-API-CALL");
        router.replace('/pantry');
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={styles.background}>
                <Image source={require('../assets/DigitalPantryLogo.png')} style={{ height: 350, width: 200, alignSelf: "center", marginTop: '15%' }}></Image>
                <TextInput
                    style={[styles.textInput, { marginTop: '15%', paddingLeft: 10 }]}
                    placeholder="Email"
                    onChangeText={onChangeEmail}
                    value={email} />
                <TextInput
                    style={[styles.textInput, { marginTop: '5%', paddingLeft: 10 }]}
                    placeholder="Password"
                    onChangeText={onChangePassword}
                    value={password} />
                <Pressable style={[styles.button, { marginTop: '8%' }]} onPress={() => login(email, password)}>
                    <Text style={{ alignSelf: 'center', paddingTop: 10 }}>Login</Text>
                </Pressable>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

export default Login;