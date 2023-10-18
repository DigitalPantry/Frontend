import colors from "../global/colors";
import { Pressable, Text, StyleSheet } from "react-native";

interface Props {
    title?: string,
    onPress: Function,
    light?: boolean,
    size?: string,
    buttonStyle?: Object,
    textStyle?: Object,
};

const Button: React.FC<Props> = ({ title, onPress, light, size, buttonStyle, textStyle }) => {
    const finalStyle = () => {
        let style: Object = {};
        if (buttonStyle) {
            return buttonStyle;
        }
        if (light) {
            style = {
                ...style,
                ...localStyles.lightButton,
            }
        } else {
            style = {
                ...style,
                ...localStyles.darkButton,
            }
        }
        if (size == 'small') {
            style = {
                ...style,
                ...localStyles.smallButton,
            }
        } else {
            style = {
                ...style,
                ...localStyles.largeButton,
            }
        }
        return style;
    }

    return (
        <Pressable style={finalStyle} onPress={() => onPress()}>
            <Text style={textStyle || localStyles.buttonText}>{title}</Text>
        </Pressable>
    );
};

const localStyles = StyleSheet.create({
    lightButton: {
        borderRadius: 20,
        backgroundColor: colors.seconday,
        alignSelf: 'center',
        justifyContent: 'center',
        shadowColor: 'black',
        shadowRadius: 1,
        shadowOpacity: .5,
        shadowOffset: {width: 0, height: 1}
    },
    darkButton: {
        backgroundColor: colors.primary,
        alignSelf: 'center',
        shadowColor: 'black',
        justifyContent: 'center',
        shadowRadius: 1,
        shadowOpacity: .5,
        shadowOffset: {width: 0, height: 1},
    },
    largeButton: {
        marginTop: '4%',
        height: 40,
        width: '50%',
        borderRadius: 20,
    },
    smallButton: {
        height: 30,
        width: 30,
        borderRadius: 30,
    },
    buttonText: {
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default Button;