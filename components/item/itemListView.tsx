import React from "react";
import colors from "../../global/colors";
import { SafeAreaView, StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { Item } from "../../models/itemModels";

interface ItemListViewProps {
    item: Item;
    expandItem: Function;
}

const ItemListView: React.FC<ItemListViewProps> = ({item, expandItem}) => {
    return (
        <SafeAreaView>
            <TouchableOpacity style={itemStyle.itemNonExpand} onPress={() => expandItem(item)}>
                <View style={{ display: 'flex', flexDirection: 'column', justifyContent:'center' }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item.name}</Text>
                    {item.expiration && <Text>{new Date(item.expiration).toDateString()}</Text>}
                </View>
                <Text style={{ alignSelf: 'center' }}>Quantity: {item.quantity}</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const itemStyle = StyleSheet.create({
    itemNonExpand: {
        width: '93%',
        height: 70,
        backgroundColor: colors.primary,
        alignSelf: 'center',
        borderRadius: 8,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        marginBottom: 5,
    },
    quantity: {
        width: 40,
        height: 70,
        backgroundColor: colors.secondary,
        borderRadius: 30,
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 5,
        marginLeft: 20,
    },
})

export default ItemListView;