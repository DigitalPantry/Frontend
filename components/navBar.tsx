import { SafeAreaView, View, Image } from "react-native";
import colors from "../global/colors";
import styles from "../global/styles";

const NavBar = () => {
    return (
        <SafeAreaView style={styles.NavContainer}>
            <View style={styles.CircleShape}>
                <Image source={require('../assets/Pantry.png')} style={{alignSelf: 'center', marginTop: 8}}></Image>
            </View>
            <View style={styles.CircleShape}>
                <Image source={require('../assets/Recipes.png')} style={{alignSelf: 'center', marginTop: 11}}></Image>
            </View>
            <View style={styles.CircleShape}>
                <Image source={require('../assets/List.png')} style={{alignSelf: 'center', marginTop: 10}}></Image>
            </View>
            <View style={styles.CircleShape}>
                <Image source={require('../assets/ProfilePic.png')} style={{alignSelf: 'center', marginTop: 10}}></Image>
            </View>
        </SafeAreaView>
    )
}

export default NavBar;