import { Redirect, Stack } from 'expo-router';
import colors from '../../global/colors';
import { useSession } from '../context/auth';
import { Text } from 'react-native';

export default function RootLayout() {
    const { session, isLoading, user } = useSession();

    if (isLoading) { //Not working currently, implemented await in /login
        console.log("display loading screen");
        return <Text>Loading...</Text> //TODO: Replace with loading component
    }
    
    console.log(session);
    if (!session) {
        console.log("redirect to login screen")
        return <Redirect href='/login' />
    }

    return <Stack
        screenOptions={{
            headerStyle: {
                backgroundColor: colors.primary,
            },
        }}>
        <Stack.Screen name='index' options={{ headerShown: false }} />
        <Stack.Screen name='(pages)' options={{ headerShown: false }} />
    </Stack>;
};