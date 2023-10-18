import styles from "../../../global/styles";
import { ScrollView, TouchableWithoutFeedback, Keyboard, View } from "react-native";
import { useRouter } from 'expo-router';
import HouseholdInfo from "../../../components/householdInfo";
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
        household_id: 1,
    }

    //LOCALTESTING test data
    const household = {
        id: 1,
        users: [
            {
                id: 1,
                first_name: 'Test',
                last_name: 'User',
            },
            {
                id: 2,
                first_name: 'Second',
                last_name: 'User',
            },
            {
                id: 3,
                first_name: 'Third',
                last_name: 'User',
            },
        ]
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView style={styles.background}>
                <ProfileInfo user={user} />
                <HouseholdInfo user={user} household={household} />
                <Button title="Logout" onPress={handleLogout} />
                <View style={{marginTop: 20}} />
            </ScrollView>
        </TouchableWithoutFeedback>
    )
}

export default profile;