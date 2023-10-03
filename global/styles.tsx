import { StyleSheet } from 'react-native';
import colors from './colors';

const styles = StyleSheet.create({
    mainTheme: {
        backgroundColor: colors.background,
        height: '100%',
        width: '100%',
    },
    HeaderContainer: {
        width: '100%',
        height: '16%',
        backgroundColor: colors.primary,
        position: 'absolute',
        top: 0,
    },
    CircleShape: {
        width: 60,
        height: 60,
        backgroundColor: colors.seconday,
        borderRadius: 30
    },
    NavContainer: {
        width: '100%',
        height: '14%',
        backgroundColor: colors.primary,
        position: 'absolute',
        bottom: 0,
        display: 'flex',
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center"
    },
    TextFields: {
        width: '60%',
        height: 40,
        borderRadius: 20,
        backgroundColor: colors.seconday,
        alignSelf: 'center'
    },
    MainButtons: {
        width: '50%',
        height: 40,
        borderRadius: 20,
        backgroundColor: colors.primary,
        alignSelf: 'center'
    }
})

export default styles;