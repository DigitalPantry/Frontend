import { StyleSheet } from 'react-native';
import colors from './colors';

const styles = StyleSheet.create({
    background: {
        backgroundColor: colors.background,
        height: '100%',
        width: '100%',
    },
    modal: {
        width: '90%',
        backgroundColor: colors.primary,
        borderRadius: 5,
        alignSelf: 'center',
        marginTop: 20,
        padding: 20,
    },
    modalIcon: {
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 10,
    },
    textInput: {
        width: '60%',
        height: 40,
        borderRadius: 20,
        backgroundColor: colors.seconday,
        alignSelf: 'center',
        marginTop: '5%',
        paddingLeft: 10,
        shadowColor: 'black',
        shadowRadius: 1,
        shadowOpacity: .5,
        shadowOffset: {width: 0, height: 1}
    },
    link: {
        alignSelf: 'center',
        marginTop: '2%',
        textDecorationLine: 'underline'
    },
    line: {
        backgroundColor: colors.seconday,
        height: 1
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 24,
        alignSelf: 'center',
    },
    errorText: {
        color: 'red',
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    errorField: {
        width: '60%',
        height: 40,
        borderRadius: 20,
        backgroundColor: colors.seconday,
        alignSelf: 'center',
        marginTop: '5%',
        paddingLeft: 10,
        borderColor: 'red',
        borderWidth: 1,
        shadowColor: 'red',
        shadowRadius: 5,
        shadowOpacity: .4,
    },
    popModal: {
        flex: 1,
        backgroundColor: colors.background,
    }
});

export default styles;