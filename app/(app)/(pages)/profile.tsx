import styles from "../../../global/styles";
import { ScrollView, TouchableWithoutFeedback, Keyboard, View, Platform, KeyboardAvoidingView } from "react-native";
import HouseholdInfo from "../../../components/profile/householdInfo";
import ProfileInfo from "../../../components/profile/profileInfo";
import Button from "../../../components/global/Button";
import { useSession } from "../../context/auth";
import { useEffect, useState } from 'react';
import { getHouseholdById } from "../../../services/householdService";

const profile: React.FC = () => {
    const { logout, user } = useSession();
    const [household, setHousehold] = useState({});

    useEffect(() => {
        async function getMembers() {
            const members = await getHouseholdById(user.id || -1);
            setHousehold(members);
            console.log("MEMBERS")
            console.log(members);
        }
        getMembers();
    }, [user.household_id])

    //LOCALTESTING test data
    // const user = {
    //     id: 1,
    //     first_name: 'Test',
    //     last_name: 'User',
    //     email: 'test@gmail.com',
    //     password: 'password123',
    //     household_id: 1,
    // }

    //LOCALTESTING test data
    // const household = {
    //     id: 1,
    //     users: [
    //         {
    //             id: 1,
    //             first_name: 'Test',
    //             last_name: 'User',
    //         },
    //         {
    //             id: 2,
    //             first_name: 'Second',
    //             last_name: 'User',
    //         },
    //         {
    //             id: 3,
    //             first_name: 'Third',
    //             last_name: 'User',
    //         },
    //     ]
    // }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={90}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView style={styles.background}>
                    <ProfileInfo user={user} />
                    <HouseholdInfo user={user} household={household} />
                    <Button title="Logout" onPress={logout} />
                    <View style={{ marginTop: 20 }} />
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default profile;