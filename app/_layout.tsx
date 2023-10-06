import { Stack } from 'expo-router';
import colors from '../global/colors';

export default function Layout() {
    return <Stack
        screenOptions={{
            headerStyle: {
                backgroundColor: colors.primary,
            },
        }}>
        <Stack.Screen name='index' options={{ headerShown: false }} />
        <Stack.Screen name='(pages)' options={{ headerShown: false }} />
    </Stack>;
}