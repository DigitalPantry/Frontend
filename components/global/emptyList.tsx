import { View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

const emptyList: React.FC = () => {
    return <View style={{display: 'flex', alignItems: 'center', paddingTop: '5%'}}>
        <Icon
            name="mood-bad"
            size={30}
            color="black"
        />
    </View>
}

export default emptyList;