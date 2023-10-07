import styles from "../../../global/styles";
import colors from "../../../global/colors";
import { Pressable, SafeAreaView, TextInput, Image, Text, TouchableWithoutFeedback, Keyboard, View } from "react-native";
import { Stack, usePathname, useRouter } from 'expo-router';
import { useState } from "react";
import Household from "../../../components/household";

const profile: React.FC = () => {
    const router = useRouter();

    const HandleLogout = () => {
        router.replace('/login')
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={styles.background}>
                <View style={{
                    width: '95%',
                    backgroundColor: colors.primary,
                    borderRadius: 5,
                    alignSelf: 'center',
                    marginTop: 20,
                    
                }}>
                    <Text style={{color: colors.primaryText, margin: 8}}>First Name: </Text>
                    <Text style={{color: colors.primaryText, margin: 8}}>Last Name: </Text>
                    <Text style={{color: colors.primaryText, margin: 8}}>Email: </Text>
                    <Text style={{color: colors.primaryText, margin: 8}}>Date of Birth: </Text>
                    <Text style={{color: colors.primaryText, margin: 8}}>Password: </Text>
                </View>
                
                <Household></Household>

                <Pressable style={{width: 180, height: 40, backgroundColor: colors.primary, alignSelf: 'center', borderRadius: 20, margin: 12}}
                    onPress={() => HandleLogout()}>

                    <Text style={{alignSelf: 'center', marginTop: 10, color: colors.primaryText}}>Logout</Text>
                </Pressable>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

export default profile;