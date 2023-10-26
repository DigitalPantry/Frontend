import { Redirect } from "expo-router";

const Home: React.FC = () => {
    return <Redirect href='/pantry' /> //Post-Auth Landing Page
}

export default Home;