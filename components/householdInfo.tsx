import colors from "../global/colors";
import { Text, View, Image, StyleSheet, TextInput } from "react-native";
import { User } from "../models/userModels";
import { Household } from "../models/householdModels";
import styles from "../global/styles";
import Button from "./Button";
import { useState } from "react";

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

    const removeMember = (id: number) => {
        console.log(`REMOVE-MEMBER ${id}`);
    };

    const addMember = () => {
        console.log(`ADD-MEMBER ${memberEmail}`);
    };
    
    const householdMemberRow: React.FC<rowProps> = ({ user, childUser }) => {
        const me = user.id == childUser.id;
        return (
            <View key={childUser.id} style={localStyles.userRow}>
                <Text style={{ fontSize: 16 }}>{childUser.first_name} {childUser.last_name} {me ? "(Me)" : null}</Text>
                {!me && <Button
                    title="x"
                    onPress={() => removeMember(childUser.id)}
                    size={"small"} />}
            </View>
        )
    };

    return (
        <View style={styles.modal}>
            <Image source={require('../assets/HouseIcon.png')} style={styles.modalIcon} />
            {household.users.map(childUser => householdMemberRow({ user, childUser }))}
            {showAddMember && <View style={{justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', paddingRight: 9 }}>
                <TextInput
                    style={[styles.textInput, localStyles.userInput]}
                    placeholder="User's Email"
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
        backgroundColor: colors.seconday,
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

//FUTURE USE ON DIFF PAGE
{/* <Modal animationType="slide" visible={showAddMember} presentationStyle="formSheet" onRequestClose={() => setAddMember(false)}>
<View style={styles.popModal}>
    <View style={styles.modal}>

    </View>
</View>
</Modal> */}