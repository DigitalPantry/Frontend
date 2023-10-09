import colors from "../global/colors";
import { Pressable, Text, StyleSheet } from "react-native";

interface Props {
    title?: string,
    onPress: Function,
    light?: boolean,
    buttonStyle?: Object,
    textStyle?: Object,
};

const Button: React.FC<Props> = ({ title, onPress, light, buttonStyle, textStyle }) => {
    return (
        <Pressable style={buttonStyle || (light ? buttonStyles.lightButton : buttonStyles.darkButton)} onPress={() => onPress()}>
            <Text style={textStyle || buttonStyles.buttonText}>{title}</Text>
        </Pressable>
    );
};

const buttonStyles = StyleSheet.create({
    lightButton: {
        width: '50%',
        height: 40,
        borderRadius: 20,
        backgroundColor: colors.seconday,
        alignSelf: 'center',
        marginTop: '8%',
        shadowColor: 'black',
        shadowRadius: 1,
        shadowOpacity: .5,
        shadowOffset: {width: 0, height: 1}
    },
    darkButton: {
        width: '50%',
        height: 40,
        borderRadius: 20,
        backgroundColor: colors.primary,
        alignSelf: 'center',
        marginTop: '8%',
        shadowColor: 'black',
        shadowRadius: 1,
        shadowOpacity: .5,
        shadowOffset: {width: 0, height: 1}
    },
    buttonText: {
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 10,
    },
});

export default Button;