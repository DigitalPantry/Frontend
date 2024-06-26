import styles from "../../../global/styles";
import colors from "../../../global/colors";
import { TouchableWithoutFeedback, Keyboard, View, RefreshControl } from "react-native";
import { useEffect, useState, useCallback, useRef, useMemo } from 'react';
import SearchBarFilter from "../../../components/item/searchBar";
import { FAB } from 'react-native-elements';
import { useSession } from "../../context/auth";
import { GetRecipesByHousehold } from "../../../services/recipeService";
import { Recipe, RecipeResponse } from "../../../models/recipeModels";
import { UpsertRecipe, RemoveRecipe, GenerateRecipe } from '../../../services/recipeService';
import Ionicons from '@expo/vector-icons/Ionicons';
import { FlatList } from "react-native-gesture-handler";
import EmptyList from "../../../components/global/emptyList";
import { BottomSheetModal, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import RecipeExpanded from "../../../components/recipe/recipeExpanded";
import NewRecipe from "../../../components/recipe/newRecipe";
import RecipeSwipeableRow from "../../../components/recipe/recipeSwipeableRow";
import RecipeListView from "../../../components/recipe/recipeListView";
import NewSearchBar from "../../../components/global/newSearchBar";

const Recipes: React.FC = () => {
    const { user } = useSession();
    const [items, setItems] = useState<Recipe[]>([]);
    const [showAddItem, setShowAddItem] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const itemExpandedRef = useRef<BottomSheetModal>(null);
    const addItemRef = useRef<BottomSheetModal>(null);
    const [filterObj, setFilterObj] = useState({
		household_id: user.household_id || -1,
		name: null,
	});

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
            setRefreshing(true);
            const responseData: RecipeResponse = await GetRecipesByHousehold(filterObj.household_id, filterObj.name);

            if (responseData.recipes) {
                setItems(responseData.recipes);
            }
                

            setRefreshing(false);
        } catch (error) {
            setRefreshing(false);
            throw error;
        }
    }

    const addRecipe = async (recipe: Recipe) => {
        recipe.household_id = user.household_id;
        await UpsertRecipe(recipe)
        refreshItems();
    }

    const removePantryItem = async (id: number) => {
        const response = await RemoveRecipe(id);
        const updatedData = items.filter(item => item.id !== id);
        if (response.success == true)
            setItems(updatedData);
    }

    const SwipeableRow = ({ recipe, index }: { recipe: Recipe; index: number }) => {
        return <RecipeSwipeableRow deleteItem={() => removePantryItem(recipe.id || -1)}>
            <RecipeListView key={index} recipe={recipe} expandedRecipe={displayExpandItem} />
        </RecipeSwipeableRow>
    }

    const displayExpandItem = async (item: any) => {
        await setEditItem(item);
        handlePresentExpandModal();
    }

    const displayAddItem = async (state: boolean) => {
        await setShowAddItem(state);
        handlePresentAddModal();
    }

    const generateNewItem = async () => {
        setRefreshing(true);
        await GenerateRecipe(filterObj.household_id);
        refreshItems();
    }

    const handlePresentExpandModal = useCallback(() => {
        itemExpandedRef.current?.present();
    }, []);

    const handlePresentAddModal = useCallback(() => {
        addItemRef.current?.present();
    }, []);

    const expandItemSnapPoints = useMemo(() => ['95%'], []);
    const addItemSnapPoints = useMemo(() => ['95%'], []);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.background}>
                <NewSearchBar showFilters={false} setFilterObject={setFilterObj} filterObject={filterObj} refreshData={refreshItems} />
                <FlatList
                    data={items}
                    ItemSeparatorComponent={() => <View style={{ padding: 5 }} />}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                    renderItem={({ item, index }) => (
                        <SwipeableRow recipe={item} index={index} />
                    )}
                    ListEmptyComponent={<EmptyList />}
                />
                <FAB title={<Ionicons size={30} color='black' name="add-outline" />} color={colors.active} style={{ position: 'absolute', bottom: 15, right: 15 }} onPress={() => displayAddItem(true)} />
                <FAB title={<Ionicons size={30} color='black' name="flash-outline" />} color={colors.active} style={{ position: 'absolute', bottom: 70, right: 15 }} onPress={generateNewItem} />
                {showAddItem && <BottomSheetModal
                    ref={addItemRef}
                    index={0}
                    snapPoints={addItemSnapPoints}
                    enablePanDownToClose
                    backgroundStyle={styles.popModalHalf}
                    onDismiss={() => displayAddItem(false)}
                >
                    <BottomSheetScrollView>
                        <NewRecipe
                            close={() => displayAddItem(false)}
                            submitRecipe={(recipe: Recipe) => addRecipe(recipe)}
                        />
                    </BottomSheetScrollView>
                </BottomSheetModal>}
                {editItem && <BottomSheetModal
                    ref={itemExpandedRef}
                    index={0}
                    snapPoints={expandItemSnapPoints}
                    enablePanDownToClose
                    backgroundStyle={styles.popModalHalf}
                    onDismiss={() => setEditItem(null)}
                >
                    <BottomSheetScrollView>
                        <RecipeExpanded
                            close={() => setEditItem(null)}
                            submitRecipe={(recipe: Recipe) => addRecipe(recipe)}
                            recipe={editItem}
                        />
                    </BottomSheetScrollView>
                </BottomSheetModal>}
            </View>
        </TouchableWithoutFeedback>
    )
}

export default Recipes;