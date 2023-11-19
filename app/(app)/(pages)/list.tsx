import styles from "../../../global/styles";
import colors from "../../../global/colors";
import { TouchableWithoutFeedback, Keyboard, View, Modal, ScrollView, RefreshControl } from "react-native";
import { useEffect, useState, useCallback } from 'react';
import SearchBarFilter from "../../../components/searchBar";
import ItemListView from "../../../components/itemListView";
import { FAB } from 'react-native-elements';
import { useSession } from "../../context/auth";
import { GetItemsByHousehold } from "../../../services/itemService";
import { Item, ItemResponse } from "../../../models/itemModels";
import NewItem from "../../../components/newItem";
import { UpsertItem } from '../../../services/itemService';
import { itemFoundIn } from "../../../global/constants";

const list: React.FC = () => {
    const { user } = useSession();
    const [items, setItems] = useState<Item[]>([]);
    const [showAddMember, setShowAddMember] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            refreshItems();
            setRefreshing(false);
        }, 2000);
    }, []);

    useEffect(() => {
        refreshItems();
    }, [user]);

    const refreshItems = async () => {
        try {
            const responseData: ItemResponse = await GetItemsByHousehold(user.household_id || -1, itemFoundIn.LIST);
            if (responseData.items) {
                // Update the state with the retrieved items
                setItems(responseData.items);
            }
        } catch (error) {
            throw error;
        }
    }

    const addPantryItem = async (item: Item) => {
        item.household_id = user.household_id;
        item.found_in = itemFoundIn.LIST;
        await UpsertItem(item)
        refreshItems();
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.background}>
                <SearchBarFilter />
                <ScrollView
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                >
                    {items.map((item) => {
                        return <ItemListView key={item.id} item={item} />
                    })}
                    <Modal animationType="slide" visible={showAddMember} presentationStyle="formSheet" onRequestClose={() => setShowAddMember(false)}>
                        <View style={styles.popModal}>
                            <NewItem
                                close={() => setShowAddMember(false)}
                                submitItem={(item: Item) => addPantryItem(item)}
                                itemType={itemFoundIn.LIST}
                            />
                        </View>
                    </Modal>
                </ScrollView>
                <FAB title="+" color={colors.active} style={{ position: 'absolute', bottom: 15, right: 15 }} onPress={() => setShowAddMember(true)} />
            </View>
        </TouchableWithoutFeedback>
    )
}

export default list;