import colors from "../global/colors";
import { Pressable, Text, View } from "react-native";

const Household: React.FC = () => {
    return (
        <View style={{
            width: '95%',
            backgroundColor: colors.primary,
            borderRadius: 5,
            alignSelf: 'center',
            marginTop: 20,
        }}>
            <Text style={{color: colors.primaryText, alignSelf: 'center', margin: 10}}>
                Household Name
            </Text>

            {/* Household Member Pressable temp */}
            <Pressable style={{width: '75%', height: 40, backgroundColor: colors.seconday, 
                alignSelf: 'center', borderRadius: 8, marginTop: 12}}>

                <View style={{ display: 'flex', justifyContent: 'space-between'}}>
                    <Text style={{marginTop: 8, marginLeft: 5}}>Name</Text>
                    <Pressable style={{backgroundColor: colors.primary, height: 30, width: 30, 
                        borderRadius: 15, position: 'absolute', right: 8, top: 5}}>

                        <Text style={{alignSelf: 'center', marginTop: 3}}>-</Text>
                    </Pressable>
                </View> 
            </Pressable>

            {/* Pressable add */}
            <Pressable style={{width: '75%', height: 40, backgroundColor: colors.seconday, alignSelf: 'center', borderRadius: 8, margin: 12}}>
                <Text style={{alignSelf: 'center', marginTop: 8}}>+</Text>
            </Pressable>
        </View>
    )
}

export default Household;