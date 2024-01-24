import colors from "../../global/colors";
import { Text, View, Image, StyleSheet, TextInput } from "react-native";
import { LoginResponse, RegisterResponse, User } from "../../models/userModels";
import { Household } from "../../models/householdModels";
import styles from "../../global/styles";
import Button from "../global/Button";
import { useEffect, useState } from "react";
import { addNewHHMember, getHouseholdById, removeHHMember } from "../../services/householdService";

interface Props {
    user: User,
    household: Household,
};

interface rowProps {
    user: User,
    childUser: User,
};

const HouseholdInfo: React.FC<Props> = ({ user, household }) => {
    const [showAddMember, setAddMember] = useState<boolean>(false);
    const [memberEmail, setMemberEmail] = useState<string>("");
    const [houseMembers, setHouseMembers] = useState(household.users)
    
    useEffect(() => {
        household.users?.filter(() => user.id)
        if (houseMembers === undefined) {
            setHouseMembers(household.users)
        }
    })

    useEffect(() => {
        async function getMembers() {
            const members = await getHouseholdById(user.id || -1);
            household.users = members.users
        }
        getMembers();
    }, [household.users])

    const removeMember = async (id: number) => {
        try {
            let response = await removeHHMember(id, household.id || -1);
            if (response.success) {
                setHouseMembers(response.updatedUsers)
            }
            
            return { success: true, message: "User removed from household."}
        } catch (error) {
            return { success: false, message: 'An error occured removing user' }
        }
    };
    
    const addMember = async (): Promise<RegisterResponse> => {
        try {   
            let response = await addNewHHMember({first_name: "temp", last_name: "user", email: memberEmail, password: "temp123", household_id: household.id}) 
            houseMembers?.push(response.user)
            setAddMember(false);
            setMemberEmail("");

            return { success: true, message: "User added to household."}
        } catch(error) {
            return { success: false, message: 'An error occured during calling addMember.' }
        }
    };
    
    const householdMemberRow: React.FC<rowProps> = ({ user, childUser }) => {
        const me = user.id == childUser.id;
        return (
            <View key={childUser.id} style={localStyles.userRow}>
                <Text style={{ fontSize: 16 }}>{childUser.first_name} {childUser.last_name} {me ? "(Me)" : null}</Text>
                {!me && <Button
                    title="x"
                    onPress={() => removeMember(childUser.id || -1)}
                    size={"small"} />}
            </View>
        )
    };

    return (
        <View style={styles.modal}>
            <Image source={require('../../assets/HouseIcon.png')} style={styles.modalIcon} />
            {houseMembers?.map(childUser => householdMemberRow({ user, childUser }))}
            {showAddMember && <View style={{justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', paddingRight: 9 }}>
                <TextInput
                    style={[styles.textInput, localStyles.userInput]}
                    placeholder="User's Email"
                    autoCapitalize="none"
                    onChangeText={setMemberEmail}
                    value={memberEmail} />
                <Button
                    title="+"
                    onPress={addMember}
                    size={"small"}
                    light={true} />
            </View>}
            <Button title={showAddMember ? "Cancel" : "+"} onPress={() => setAddMember(!showAddMember)} light={true} />
        </View>
    );
};

const localStyles = StyleSheet.create({
    userRow: {
        backgroundColor: colors.secondary,
        borderRadius: 20,
        padding: 10,
        marginBottom: 10,
        height: 50,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    userInput: {
        width: '88%',
        marginTop: '0%',
    },
});

export default HouseholdInfo;