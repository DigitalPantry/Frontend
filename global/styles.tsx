import { StyleSheet } from 'react-native';
import colors from './colors';

const styles = StyleSheet.create({
    background: {
        backgroundColor: colors.background,
        height: '100%',
        width: '100%',
    },
    footerButton: {
        marginTop: 20,
        width: 60,
        height: 60,
        backgroundColor: colors.seconday,
        borderRadius: 30
    },
    textInput: {
        width: '60%',
        height: 40,
        borderRadius: 20,
        backgroundColor: colors.seconday,
        alignSelf: 'center'
    },
    button: {
        width: '50%',
        height: 40,
        borderRadius: 20,
        backgroundColor: colors.primary,
        alignSelf: 'center'
    },
    header: {
        backgroundColor: colors.primary,
        borderBottomWidth: 0,
        shadowColor: colors.primary,
        shadowOpacity: 1,
        shadowRadius: 3,
    },
    footer: {
        backgroundColor: colors.primary,
        height: '12%',
        shadowRadius: 3,
        shadowOpacity: 1,
        borderTopWidth: 0,
        shadowColor: colors.primary
    },
})

export default styles;