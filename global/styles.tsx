import { StyleSheet } from 'react-native';
import colors from './colors';
import { I18nManager } from 'react-native';

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
        backgroundColor: colors.secondary,
        alignSelf: 'center',
        marginTop: '2%',
        paddingLeft: 10,
        shadowColor: 'black',
        shadowRadius: 1,
        shadowOpacity: .5,
        shadowOffset: {width: 0, height: 1},
    },
    link: {
        alignSelf: 'center',
        marginTop: '2%',
        textDecorationLine: 'underline'
    },
    line: {
        backgroundColor: colors.secondary,
        height: 1
    },
    headerText: {
        marginTop: 10,
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
        backgroundColor: colors.secondary,
        alignSelf: 'center',
        marginTop: '2%',
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
        paddingTop: '5%',
    },
    popModalHalf: {
        backgroundColor: colors.background,
        shadowColor: 'black',
        shadowRadius: 20,
        shadowOpacity: 10,
        borderRadius: 10
    },
    container: {
        flex: 1,
        alignItems: 'center',
        alignSelf: 'center',
    },
    swipeableRightButton: {
        alignItems: 'center',
        flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
        flex: 1,
        justifyContent: 'flex-end'
    },
    swipeableRightIcon: {
        width: 30,
        marginHorizontal: 10
    },
    labelText: {
        marginTop: '2%',
        fontSize: 18,
    },
    inputRow: {
        paddingTop: '2%',
        flexDirection: 'row',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
});

export default styles;