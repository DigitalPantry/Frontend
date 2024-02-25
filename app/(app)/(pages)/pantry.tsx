import styles from "../../../global/styles";
import colors from "../../../global/colors";
import { TouchableWithoutFeedback, Keyboard, View, Modal, Text, RefreshControl } from "react-native";
import { useEffect, useState, useCallback, useRef, useMemo, SetStateAction } from 'react';
import SearchBarFilter from "../../../components/item/searchBar";
import ItemListView from "../../../components/item/itemListView";
import { FAB, Icon } from 'react-native-elements';
import { useSession } from "../../context/auth";
import { GetItemsByHousehold } from "../../../services/itemService";
import { Item, ItemResponse } from "../../../models/itemModels";
import NewItem from "../../../components/item/newItem";
import { UpsertItem, RemoveItem } from '../../../services/itemService';
import { itemFoundIn } from "../../../global/constants";
import Ionicons from '@expo/vector-icons/Ionicons';
import { FlatList } from "react-native-gesture-handler";
import ItemSwipeableRow from "../../../components/item/itemSwipeableRow";
import EmptyList from "../../../components/global/emptyList";
import ItemExpanded from "../../../components/item/itemExpanded";
import BottomSheet, { BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet";


const pantry: React.FC = () => {
  const { user } = useSession();
  const [items, setItems] = useState<Item[]>([]);
  const [showAddItem, setShowAddItem] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const itemExpandedRef = useRef<BottomSheetModal>(null);
  const addItemRef = useRef<BottomSheetModal>(null);

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

  useEffect(() => {

  }, [items])

  const refreshItems = async () => {
    try {
      const responseData: ItemResponse = await GetItemsByHousehold(user.household_id || -1, itemFoundIn.INVENTORY);
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
    await UpsertItem(item)
    refreshItems();
  }

  const removePantryItem = async (id: number) => {
    const response = await RemoveItem(id);
    const updatedData = items.filter(item => item.id !== id);
    if (response.success == true)
      setItems(updatedData);
  }

  const SwipeableRow = ({ item, index }: { item: Item; index: number }) => {
    return <ItemSwipeableRow deleteItem={() => removePantryItem(item.id || -1)}>
      <ItemListView key={index} item={item} expandItem={displayExpandItem} />
    </ItemSwipeableRow>
  }

  const displayExpandItem = async (item: any) => {
    await setEditItem(item);
    handlePresentExpandModal();
  }

  const displayAddItem = async (state: boolean) => {
    await setShowAddItem(state);
    handlePresentAddModal();
  }

  const handlePresentExpandModal = useCallback(() => {
    itemExpandedRef.current?.present();
  }, []);

  const handlePresentAddModal = useCallback(() => {
    addItemRef.current?.present();
  }, []);

  const handleFilterResults = async (newItems: Item[]) => {
    await setItems(newItems);
  }

  const expandItemSnapPoints = useMemo(() => ['45%'], []);
  const addItemSnapPoints = useMemo(() => ['45%'], []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.background}>
        <SearchBarFilter items={items} onSort={handleFilterResults} />
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
        <FAB title={<Ionicons size={30} color='black' name="add-outline" />} color={colors.active} style={{ position: 'absolute', bottom: 15, right: 15 }} onPress={() => displayAddItem(true)} />
        {showAddItem && <BottomSheetModal
          ref={addItemRef}
          index={0}
          snapPoints={addItemSnapPoints}
          enablePanDownToClose
          backgroundStyle={styles.popModalHalf}
          onDismiss={() => displayAddItem(false)}
        >
          <NewItem
            close={() => displayAddItem(false)}
            submitItem={(item: Item) => addPantryItem(item)}
            itemType={itemFoundIn.INVENTORY}
          />
        </BottomSheetModal>}
        {editItem && <BottomSheetModal
          ref={itemExpandedRef}
          index={0}
          snapPoints={expandItemSnapPoints}
          enablePanDownToClose
          backgroundStyle={styles.popModalHalf}
          onDismiss={() => setEditItem(null)}
        >
          <ItemExpanded
            close={() => setEditItem(null)}
            submitItem={(item:Item) => addPantryItem(item)}
            itemType={itemFoundIn.INVENTORY}
            item={editItem}
          />
        </BottomSheetModal>}
      </View>
    </TouchableWithoutFeedback>
  )
}

export default pantry;