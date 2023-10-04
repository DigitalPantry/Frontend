import NavBar from "../../components/navBar";
import Header from "../../components/header";
import styles from "../../global/styles";
import colors from "../../global/colors";
import { Pressable, SafeAreaView, TextInput, Image, Text, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Stack, useRouter } from 'expo-router';
import { useState } from "react";

const profile: React.FC = () => {
    const router = useRouter();

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={styles.mainTheme}>
                <Header></Header>
                <NavBar></NavBar>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

export default profile;