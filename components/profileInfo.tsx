import styles from "../global/styles";
import { View, Image, Text, Pressable, TextInput } from "react-native";
import { User } from "../models/userModels";
import Row from "./Row";
import Button from "./Button";
import { useState, useRef, useEffect } from "react";
import { updateUser } from "../services/userService";
import { useSession } from "../app/context/auth";

interface Props {
    user: User,
};
interface Errors {
    first: boolean,
    last: boolean,
    email: boolean,
    password: boolean,
};

const profileInfo: React.FC<Props> = ({ user }) => {
    const { login } = useSession();
    const [edit, setEdit] = useState<boolean>(false);
    const [first_name, onChangeFirstName] = useState<User["first_name"]>(user.first_name);
    const [last_name, onChangeLastName] = useState<User["last_name"]>(user.last_name);
    const [email, onChangeEmail] = useState<User["email"]>(user.email);
    const [password, onChangePassword] = useState<User["password"]>();
    const [errors, setErrors] = useState<Errors>({ first: false, last: false, email: false, password: false });
    const lastField = useRef<TextInput>(null);
    const emailField = useRef<TextInput>(null);
    const passwordField = useRef<TextInput>(null);

    //Enables profile editing
    const handleEdit = () => {
        setEdit(!edit);
    }

    //Clear error on field change
    useEffect(() => {
        clearErrors();
    }, [first_name, last_name, email, password]);

    //Clears errors on data update
    const clearErrors = () => {
        setErrors({ first: false, last: false, email: false, password: false });
    }

    //Checks if errors set
    const hasErrors = () => { return Object.values(errors).some((value) => value === true) };

    //Validate data
    const validate = () => {
        if (!password || password.length > 100) {
            setErrors((prevErrors) => ({ ...prevErrors, password: true }));
        }
        if (!email || email.length > 100) {
            setErrors((prevErrors) => ({ ...prevErrors, email: true }));
        }
        if (!last_name || last_name.length > 100) {
            setErrors((prevErrors) => ({ ...prevErrors, last: true }));
        }
        if (!first_name || first_name.length > 100) {
            setErrors((prevErrors) => ({ ...prevErrors, first: true }));
        }
        return !hasErrors();
    }

    //Process data
    const saveUser = async () => {
        //LOCALTESTING disabled
        if (!validate()) { return; }
        await updateUser({ id: user.id, first_name, last_name, email, password })
        await login(email || "", password || "");
        setEdit(false);
    };

    return (
        <View style={styles.modal}>
            <Image source={require('../assets/ProfilePic.png')} style={styles.modalIcon} />
            {!edit ? <>
                <Row header="First Name:" data={user.first_name} divider={true} />
                <Row header="Last Name:" data={user.last_name} divider={true} />
                <Row header="Email:" data={user.email} divider={true} />
                <Button title="Edit" onPress={handleEdit} light={true} />
            </> : <>
                <TextInput
                    autoComplete="given-name"
                    style={errors.first ? styles.errorField : styles.textInput}
                    placeholder="First Name"
                    onChangeText={onChangeFirstName}
                    value={first_name}
                    onSubmitEditing={() => lastField.current?.focus()} />
                <TextInput
                    ref={lastField}
                    autoComplete="family-name"
                    style={errors.last ? styles.errorField : styles.textInput}
                    placeholder="Last Name"
                    onChangeText={onChangeLastName}
                    value={last_name}
                    onSubmitEditing={() => emailField.current?.focus()} />
                <TextInput
                    ref={emailField}
                    autoComplete="email"
                    style={errors.email ? styles.errorField : styles.textInput}
                    placeholder="Email"
                    onChangeText={onChangeEmail}
                    value={email}
                    onSubmitEditing={() => passwordField.current?.focus()} />
                <TextInput
                    ref={passwordField}
                    autoComplete="new-password"
                    style={errors.password ? styles.errorField : styles.textInput}
                    placeholder="Password"
                    onChangeText={onChangePassword}
                    value={password}
                    onSubmitEditing={saveUser} />
                <Button title="Save" onPress={saveUser} light={true} />
                <Pressable onPress={handleEdit}>
                    <Text style={styles.link}>Cancel</Text>
                </Pressable>
            </>}
        </View>
    );
};

export default profileInfo;