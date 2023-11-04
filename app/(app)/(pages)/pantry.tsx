import styles from "../../../global/styles";
import colors from "../../../global/colors";
import { Pressable, ScrollView, TextInput, Image, Text, TouchableWithoutFeedback, Keyboard, View } from "react-native";
import { Stack, useRouter } from 'expo-router';
import { useState } from "react";
import SearchBarFilter from "../../../components/searchBar";
import ListItem from "../../../components/itemExpanded";
import { FAB } from 'react-native-elements';


const pantry: React.FC = () => {
    const router = useRouter();
    
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.background}>
                <SearchBarFilter></SearchBarFilter>
                <Text>pantry page</Text>
                <ListItem></ListItem>
                <FAB title="+" color={colors.active} style={{position: 'absolute', bottom: 10, right: 10}} onPress={() => router.replace("/newItem")} />
            </View>
        </TouchableWithoutFeedback>
    )
}

export default pantry;