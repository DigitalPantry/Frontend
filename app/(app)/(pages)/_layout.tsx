import { Tabs, usePathname } from 'expo-router';
import { Image, StyleSheet, View } from 'react-native';
import colors from '../../../global/colors';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

export default function Layout() {

    const layoutStyles = StyleSheet.create({
        footer: {
            backgroundColor: colors.primary,
            height: '12%',
            shadowRadius: 3,
            shadowOpacity: 1,
            borderTopWidth: 0,
            shadowColor: colors.primary
        },
        footerButton: {
            marginTop: 20,
            width: 60,
            height: 60,
            backgroundColor: colors.secondary,
            borderRadius: 30
        },
        footerIcon: {
            alignSelf: 'center',
            marginTop: 11
        },
        header: {
            backgroundColor: colors.primary,
            borderBottomWidth: 0,
            shadowColor: colors.primary,
            shadowOpacity: 1,
            shadowRadius: 3,
        },
    });

    const isActive = (path: string) => {
        const pathName = usePathname();
        return path == pathName;
    };

    return (
        <BottomSheetModalProvider>
            <Tabs screenOptions={{
                tabBarShowLabel: false,
                headerStyle: layoutStyles.header,
                headerTitleStyle: {
                    fontWeight: 'bold',
                    fontSize: 20,
                },
                tabBarStyle: layoutStyles.footer,
            }}>
                <Tabs.Screen name='pantry' options={{
                    title: 'Pantry',
                    tabBarIcon: () => (<View style={{ ...layoutStyles.footerButton, backgroundColor: isActive('/pantry') ? colors.active : colors.secondary }}>
                        <Image source={require('../../../assets/Pantry.png')} style={layoutStyles.footerIcon} />
                    </View>),
                }} />
                <Tabs.Screen name='recipes' options={{
                    title: 'Recipes',
                    tabBarIcon: () => (<View style={{ ...layoutStyles.footerButton, backgroundColor: isActive('/recipes') ? colors.active : colors.secondary }}>
                        <Image source={require('../../../assets/Recipes.png')} style={layoutStyles.footerIcon} />
                    </View>)
                }} />
                <Tabs.Screen name='list' options={{
                    title: 'List',
                    tabBarIcon: () => (<View style={{ ...layoutStyles.footerButton, backgroundColor: isActive('/list') ? colors.active : colors.secondary }}>
                        <Image source={require('../../../assets/List.png')} style={layoutStyles.footerIcon} />
                    </View>)
                }} />
                <Tabs.Screen name='profile' options={{
                    title: 'Profile',
                    tabBarIcon: () => (<View style={{ ...layoutStyles.footerButton, backgroundColor: isActive('/profile') ? colors.active : colors.secondary }}>
                        <Image source={require('../../../assets/ProfilePic.png')} style={layoutStyles.footerIcon} />
                    </View>)
                }} />
            </Tabs>
        </BottomSheetModalProvider>
    );
};