import { SafeAreaView, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import styles from '../global/styles';
import { serverlessTest } from '../services/userService';

const Home = () => {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.mainTheme}>
            <Text>Home</Text>
            <TouchableOpacity onPress={() => serverlessTest()}>
                <Image source={require('../assets/searchIcon.png')}/>
            </TouchableOpacity>  
        </SafeAreaView>
    )
}

export default Home;