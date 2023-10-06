import { Tabs, usePathname } from 'expo-router';
import { Image, View } from 'react-native';
import styles from '../../../global/styles';
import colors from '../../../global/colors';

export default function Layout() {

    const isActive = (path: string) => {
        const pathName = usePathname();
        return path == pathName;
    }

    return (
        <Tabs screenOptions={{
            tabBarShowLabel: false,
            headerStyle: styles.header,
            headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 20,
            },
            tabBarStyle: styles.footer,
        }}>
            <Tabs.Screen name='pantry' options={{
                title: 'Pantry',
                tabBarIcon: () => (<View style={{ ...styles.footerButton, backgroundColor: isActive('/pantry') ? colors.active : colors.seconday }}>
                    <Image source={require('../../../assets/Pantry.png')} style={{ alignSelf: 'center', marginTop: 11 }} />
                </View>),
            }} />
            <Tabs.Screen name='recipes' options={{
                title: 'Recipes',
                tabBarIcon: () => (<View style={{ ...styles.footerButton, backgroundColor: isActive('/recipes') ? colors.active : colors.seconday }}>
                    <Image source={require('../../../assets/Recipes.png')} style={{ alignSelf: 'center', marginTop: 11 }} />
                </View>)
            }} />
            <Tabs.Screen name='list' options={{
                title: 'List',
                tabBarIcon: () => (<View style={{ ...styles.footerButton, backgroundColor: isActive('/list') ? colors.active : colors.seconday }}>
                    <Image source={require('../../../assets/List.png')} style={{ alignSelf: 'center', marginTop: 11 }} />
                </View>)
            }} />
            <Tabs.Screen name='profile' options={{
                title: 'Profile',
                tabBarIcon: () => (<View style={{ ...styles.footerButton, backgroundColor: isActive('/profile') ? colors.active : colors.seconday }}>
                    <Image source={require('../../../assets/ProfilePic.png')} style={{ alignSelf: 'center', marginTop: 11 }} />
                </View>)
            }} />
        </Tabs>
    );
}