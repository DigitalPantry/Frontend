import styles from "../../../global/styles";
import colors from "../../../global/colors";
import { TouchableWithoutFeedback, Keyboard, View, Modal, Text, RefreshControl } from "react-native";
import { useEffect, useState, useCallback } from 'react';
import SearchBarFilter from "../../../components/searchBar";
import ItemListView from "../../../components/itemListView";
import { FAB } from 'react-native-elements';
import { useSession } from "../../context/auth";
import { GetItemsByHousehold, RemoveItem } from "../../../services/itemService";
import { Item, ItemResponse } from "../../../models/itemModels";
import NewItem from "../../../components/newItem";
import { UpsertItem } from '../../../services/itemService';
import { itemFoundIn } from "../../../global/constants";
import Ionicons from '@expo/vector-icons/Ionicons';
import { FlatList } from "react-native-gesture-handler";
import ItemSwipeableRow from "../../../components/itemSwipeableRow";
import Icon from 'react-native-vector-icons/MaterialIcons';
import EmptyList from "../../../components/emptyList";

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

    const addListItem = async (item: Item) => {
        item.household_id = user.household_id;
        item.found_in = itemFoundIn.LIST;
        await UpsertItem(item)
        refreshItems();
    }

    const removeListItem = async (id: number) => {
        const response = await RemoveItem(id);
        const updatedData = items.filter(item => item.id !== id);
        if (response.success == true)
            setItems(updatedData);
    }

    const SwipeableRow = ({ item, index }: { item: Item; index: number }) => {
        return <ItemSwipeableRow deleteItem={() => removeListItem(item.id || -1)}>
            <ItemListView key={index} item={item} />
        </ItemSwipeableRow>
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.background}>
                <SearchBarFilter />
                <FlatList
                    data={items}
                    ItemSeparatorComponent={() => <View style={{ padding: 5 }} />}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                    renderItem={({ item, index }) => (
                        <SwipeableRow item={item} index={index} />
                    )}
                    ListEmptyComponent={<EmptyList />}
                />
                <Modal animationType="slide" visible={showAddMember} presentationStyle="formSheet" onRequestClose={() => setShowAddMember(false)}>
                    <View style={styles.popModal}>
                        <NewItem
                            close={() => setShowAddMember(false)}
                            submitItem={(item: Item) => addListItem(item)}
                            itemType={itemFoundIn.LIST}
                        />
                    </View>
                </Modal>
                <FAB title={<Ionicons size={30} color='black' name="add-outline"/>} color={colors.active} style={{ position: 'absolute', bottom: 15, right: 15 }} onPress={() => setShowAddMember(true)} />
            </View>
        </TouchableWithoutFeedback>
    )
}

export default list;