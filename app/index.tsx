import { Pressable, SafeAreaView, TextInput, Image, Text, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Stack, useRouter } from 'expo-router';
import styles from '../global/styles';
import colors from '../global/colors';
import LandingPage from './(pages)/login';
import { useState } from 'react';

const Home: React.FC = () => {
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
                {/* <Stack.Screen
                    options={{
                        headerStyle: { backgroundColor: colors.background },
                        headerTitle: "test",
                    }}
                /> */}
                <Image source={require('../assets/DigitalPantryLogo.png')} style={{ height: 350, width: 200, alignSelf: "center", marginTop: '5%' }}></Image>
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
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

export default Home;

//TEST CODE
// const [result, setResult] = useState<userData>();

// const testAPI = async () => {
//     const response = await helloWorld();
//     setResult(response);
// }
{/* <Text>Home</Text>
<TouchableOpacity onPress={() => testAPI()}>
<Image source={require('../assets/searchIcon.png')} />
</TouchableOpacity>
<Text>{result?.message}</Text> */}