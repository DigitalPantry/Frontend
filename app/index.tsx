import { View } from "react-native";
import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import Login from "./(auth)/login";

const Home: React.FC = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [page, setPage] = useState(<Login />);

    useEffect(() => {
        switch (loggedIn) {
            case true:
                setPage(<Redirect href={'/pantry'}/>)
            case false:
                setPage(<Login />)
            default:
                setPage(<Login />) //TODO: Replace with loading component
        }
    }, [loggedIn]);

    return (
        <View>
            {page}
        </View>
    )
}

export default Home;