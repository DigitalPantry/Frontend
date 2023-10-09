import styles from "../../../global/styles";
import { ScrollView, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useRouter } from 'expo-router';
import Household from "../../../components/household";
import ProfileInfo from "../../../components/profileInfo";
import Button from "../../../components/Button";

const profile: React.FC = () => {
    const router = useRouter();

    const handleLogout = () => {
        router.replace('/login')
    }

    //LOCALTESTING test data
    const user = {
        id: 1,
        first_name: 'Test',
        last_name: 'User',
        email: 'test@gmail.com',
        password: 'password123',
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView style={styles.background}>
                <ProfileInfo user={user}/>
                <Household />
                <Button title="Logout" onPress={handleLogout} />
            </ScrollView>
        </TouchableWithoutFeedback>
    )
}

export default profile;