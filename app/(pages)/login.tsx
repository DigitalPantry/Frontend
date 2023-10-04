import NavBar from "../../components/navBar";
import Header from "../../components/header";
import styles from "../../global/styles";
import colors from "../../global/colors";
import { Pressable, SafeAreaView, TextInput, Image, Text, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Stack, useRouter } from 'expo-router';
import { useState } from "react";

const Login: React.FC = () => {
    const router = useRouter();
    const [email, onChangeEmail] = useState<string>();
    const [password, onChangePassword] = useState<string>();

    const login = async () => {
        console.log('LOGIN-API-CALL');
        router.replace('/pantry');
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={styles.mainTheme}>
                <Image source={require('../../assets/DigitalPantryLogo.png')} style={{ height: 350, width: 200, alignSelf: "center", marginTop: '5%' }}></Image>
                <TextInput
                    style={[styles.TextFields, { marginTop: '15%', paddingLeft: 10 }]}
                    placeholder="Email"
                    onChangeText={onChangeEmail}
                    value={email} />
                <TextInput
                    style={[styles.TextFields, { marginTop: '5%', paddingLeft: 10 }]}
                    placeholder="Password"
                    onChangeText={onChangePassword}
                    value={password} />
                <Pressable style={[styles.MainButtons, { marginTop: '8%' }]} onPress={() => login()}>
                    <Text style={{ alignSelf: 'center', paddingTop: 10 }}>Login</Text>
                </Pressable>
                {/* {showNavs && <Header></Header>}
                {showNavs && <NavBar></NavBar>} */}
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

export default Login;