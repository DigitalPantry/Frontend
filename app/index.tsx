import { SafeAreaView, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import styles from '../global/styles';
import { serverlessTest } from '../services/userService';
import NavBar from '../components/navBar';
import Header from '../components/header';
import LandingPage from '../pages/home';

const Home = () => {
    const router = useRouter();
        {/* <Text>Home</Text>
            <TouchableOpacity onPress={() => serverlessTest()}>
                <Image source={require('../assets/searchIcon.png')}/>
            </TouchableOpacity>  
            <NavBar></NavBar>
            <Header></Header> */}
    return (
        <LandingPage></LandingPage>
    )
}

export default Home;