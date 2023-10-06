import styles from "../../global/styles";
import colors from "../../global/colors";
import { Pressable, SafeAreaView, TextInput, Image, Text, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Stack, useRouter } from 'expo-router';
import { useState } from "react";

const recipes: React.FC = () => {
    const router = useRouter();

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={styles.background}>
                <Text>recipe page</Text>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

export default recipes;