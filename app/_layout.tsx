import { Slot } from 'expo-router';
// import { SessionProvider } from './context/auth';

export default function RootLayout() {
    return <Slot />
    // return <SessionProvider>
    //     <Slot />
    // </SessionProvider>;
}