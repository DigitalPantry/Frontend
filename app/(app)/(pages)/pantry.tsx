import styles from "../../../global/styles";
import colors from "../../../global/colors";
import { Pressable, ScrollView, TextInput, Image, Text, TouchableWithoutFeedback, Keyboard, View } from "react-native";
import { Stack, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import SearchBarFilter from "../../../components/searchBar";
import ListItem from "../../../components/itemExpanded";
import { FAB } from 'react-native-elements';
import { useSession } from "../../context/auth";
import { GetItemsByHousehold } from "../../../services/itemService";
import { Item, ItemResponse } from "../../../models/itemModels";

const pantry: React.FC = () => {
    const router = useRouter();
    
    const { user } = useSession();
    const [ items, setItems ]= useState<Item[]>([]);
    
    useEffect(() => {
        async function getItems() {
          try {
            const responseData: ItemResponse = await GetItemsByHousehold(user.household_id || -1);
            if (responseData.items) {
              // Update the state with the retrieved items
              setItems(responseData.items);
            }
          } catch (error) {
            throw error;
          }
        }

        getItems();
      }, [user]);
    
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.background}>
                <SearchBarFilter></SearchBarFilter>
                {
                    items.map((item) => {
                        return <ListItem key={item.id} item={item}/>
                    })
                }
                <FAB title="+" color={colors.active} style={{position: 'absolute', bottom: 10, right: 10}} onPress={() => router.replace("/newItem")} />
            </View>
        </TouchableWithoutFeedback>
    )
}

export default pantry;