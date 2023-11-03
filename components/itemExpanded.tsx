import React, { useEffect } from "react";
import colors from "../global/colors";
import styles from "../global/styles";
import { SafeAreaView, StyleSheet, TouchableOpacity, Text, View, TextInput, Button, Pressable } from "react-native";
import { useState } from "react";
import { Divider } from "react-native-elements";

const ListItem: React.FC = () => {

    const [toggleItem, setToggleItem] = useState(false)
    const [quantity, setQuantity] = useState(0)
    const [date, setDate] = useState('')

    const handleToggleItem = () => setToggleItem(() => !toggleItem);

    return (
        <SafeAreaView>
            <TouchableOpacity style={toggleItem ? itemStyle.itemExpanded : itemStyle.itemNonExpand} onPress={handleToggleItem}>
                {!toggleItem && 
                    <>
                        <View style={{ display: 'flex', flexDirection: 'column' }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Name of Food</Text>
                            <Text>{!date ? "mm/dd/yyy" : date}</Text>
                        </View>
                        <Text style={{ alignSelf: 'center' }}>Quantity: {quantity}</Text>
                    </>
                }
                {toggleItem && 
                    <>
                        <View>
                            <TextInput style={{fontSize: 28, alignSelf: 'center', textDecorationLine: 'underline'}}>Name of Food</TextInput>
                            <View style={{display: 'flex', flexDirection: 'row', alignSelf: 'center'}}>
                                <Text style={{fontSize: 14, alignSelf: 'center', marginTop: 8}}>Edit Expiration Date: </Text>
                                <TextInput 
                                    style={{fontSize: 14, alignSelf: 'center', marginTop: 8}}
                                    value={date}
                                    placeholder="mm/dd/yyyy"
                                    onChangeText={text => setDate(text)}
                                    />
                            </View>

                            <View style={{display: 'flex', flexDirection: 'row', alignSelf: 'center', marginTop: 15}}>
                                <Text style={{ alignSelf: 'center', fontSize: 20 }}>Edit Quantity: {quantity}</Text>
                                <View style={itemStyle.quantity}>
                                    <Pressable style={itemStyle.pressables} onPress={() => setQuantity(quantity + 1)}>
                                        <Text style={{alignSelf: 'center'}}>+</Text>
                                    </Pressable>
                                    <Pressable style={itemStyle.pressables} onPress={() => setQuantity(quantity > 0 ? quantity - 1 : quantity)}>
                                        <Text style={{alignSelf: 'center', marginTop: 6}}>-</Text>
                                    </Pressable>
                                </View>
                            </View> 

                            <View style={{display: 'flex', flexDirection: 'row'}}>
                                <Pressable style={itemStyle.buttons} onPress={handleToggleItem}>
                                    <Text style={{alignSelf: 'center', marginTop: 7}}>Save</Text>
                                </Pressable>
                                <Pressable style={itemStyle.buttons} onPress={handleToggleItem}>
                                    <Text style={{alignSelf: 'center', marginTop: 7}}>Cancel</Text>
                                </Pressable>
                            </View>
                        </View>
                    </>
                }
                
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
        padding: 10
    },
    itemExpanded: {
        width: '93%',
        height: 250,
        backgroundColor: colors.primary,
        alignSelf: 'center',
        borderRadius: 8,
        justifyContent: 'space-between',
        padding: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    buttons: {
        width: 130,
        height: 35,
        backgroundColor: colors.seconday,
        borderRadius: 25,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 40
    },
    quantity: {
        width: 40,
        height: 70,
        backgroundColor: colors.seconday,
        borderRadius: 30,
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 5,
        marginLeft: 20,
    }, 
    pressables: {
        width: 35, 
        height: 35, 
        borderRadius: 20,
        alignContent: 'center',
    }
})

export default ListItem;