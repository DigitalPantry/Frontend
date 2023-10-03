import NavBar from "../components/navBar";
import Header from "../components/header";
import styles from "../global/styles";
import colors from "../global/colors";
import { Pressable, SafeAreaView, TextInput, Image, Text } from "react-native";
import { useState } from "react";

const LandingPage = () => {

    const [showNavs, setShowNavs] = useState(false);

    return (
        <SafeAreaView style={styles.mainTheme}>
            <Image source={require('../assets/DigitalPantryLogo.png')} style={{height: 350, width: 200, alignSelf: "center", marginTop: '5%'}}></Image>
            <TextInput style={[styles.TextFields, {marginTop: '15%', paddingLeft: 10}]} placeholder="Username"></TextInput>
            <TextInput style={[styles.TextFields, {marginTop: '5%', paddingLeft: 10}]} placeholder="Password"></TextInput>
            <Pressable style={[styles.MainButtons, {marginTop: '12%'}]} onPress={() => setShowNavs(!showNavs)}>
                <Text style={{alignSelf: 'center', paddingTop: 10}}>Login</Text>
            </Pressable>
            {showNavs && <Header></Header>}
            {showNavs && <NavBar></NavBar>}
        </SafeAreaView>
    )
}

export default LandingPage;