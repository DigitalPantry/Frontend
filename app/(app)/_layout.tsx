import { Redirect, Stack } from 'expo-router';
import colors from '../../global/colors';
// import { useSession } from '../context/auth';
// import { Text } from 'react-native';

export default function RootLayout() {
    // const { session, isLoading } = useSession();

    // if (isLoading) {
    //     return <Text>Loading...</Text> //TODO: Replace with loading component
    // }

    // if (!session) {
    //     console.log('redirect login')
    //     return <Redirect href='/login' />
    // }

    return <Stack
        screenOptions={{
            headerStyle: {
                backgroundColor: colors.primary,
            },
        }}>
        {/* <Stack.Screen name='index' options={{ headerShown: false }} /> */}
        <Stack.Screen name='(pages)' options={{ headerShown: false }} />
    </Stack>;
};