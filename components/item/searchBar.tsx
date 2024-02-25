import colors from "../../global/colors";
import { Text, View, Image, StyleSheet, TextInput, SafeAreaView, TouchableOpacity, Modal } from "react-native";
import styles from "../../global/styles";
import { useEffect, useState } from "react";
import { CheckBox } from 'react-native-elements'
import { Item } from "../../models/itemModels";

interface Props {
    items: Item[],
    onSort: (newItems: Item[]) => void
};

const SearchBarFilter: React.FC<Props> = (items: Props) => {

    const [isModalVisible, setModalVisible] = useState<boolean>(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [itemsCopy, setItemsCopy] = useState<Item[]>(items.items)
    const [errorMsg, setErrorMsg] = useState<boolean>(false);
    const [filterOptions, setFilterOptions] = useState({
        expirationDate: false,
        quantity: false
    })
    
    useEffect(() => {
        items.onSort(items.items)
    }, [items.items])

    useEffect(() => {
        // Trigger the onSort callback with the sorted items
        items.onSort(itemsCopy);
    }, [itemsCopy]);

    const handleModal = () => setModalVisible(() => !isModalVisible);

    const handleSearch = () => {
        
        if (filterOptions.expirationDate && filterOptions.quantity) {
            setErrorMsg(true)
            return;
        } 

        if (filterOptions.expirationDate || filterOptions.quantity) {
            setErrorMsg(false)
        }

        if (filterOptions.quantity) {
            const sortedItems = [...items.items].sort((a, b) => b.quantity - a.quantity);
            setItemsCopy(sortedItems)
        }

        if (filterOptions.expirationDate) {
            const itemsWithDateObjects = items.items.map(item => ({
                ...item,
                expirationDate: item.expiration ? new Date(item.expiration) : undefined,
            }));
            
            const validItems = itemsWithDateObjects.filter(x => x.expiration)

            const sortedItems = validItems.sort((a, b) => {
                if (a.expirationDate && b.expirationDate) {
                    return a.expirationDate.getTime() - b.expirationDate.getTime();
                }
                
                return -1;
            });
            setItemsCopy(sortedItems)           
        }
    }

    return (
            <SafeAreaView>    
            <View style={pantryStyles.search}>
                <TextInput
                    placeholder="Search..."
                    value={searchTerm}
                    style={{paddingLeft: '2%'}}
                    onChangeText={text => setSearchTerm(text)}
                />
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <TouchableOpacity onPress={() => console.log('searching')}>
                        <Image 
                            source={require('../../assets/searchIcon.png')} 
                            style={styles.modalIcon}
                            
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleModal}>
                        <Image 
                            source={require('../../assets/filter.png')} 
                            style={styles.modalIcon}
                            
                        />
                    </TouchableOpacity>
                </View>
            </View>

                <Modal visible={isModalVisible} animationType="slide" transparent={true}
                        style={{flex: 1}}>
                    <View style={pantryStyles.modalStyle}>
                        <Text style={{position: 'absolute', top: 30, alignSelf: 'center', fontSize: 30, textAlign: 'center', marginBottom: '20%'}}>
                            Filter Search Results
                        </Text>
                        <View style={{marginTop: '25%'}}>
                            <CheckBox 
                                title="Expiration Date"
                                checked={filterOptions.expirationDate}
                                onPress={() => setFilterOptions({ ...filterOptions, expirationDate: !filterOptions.expirationDate})}
                            />
                            <CheckBox 
                                title="Quantity"
                                checked={filterOptions.quantity}
                                onPress={() => setFilterOptions({ ...filterOptions, quantity: !filterOptions.quantity})}
                            />
                        </View>
                        <View style={{display: 'flex', flexDirection: 'column', marginTop: '12%'}}>
                            {errorMsg && <Text style={styles.errorText}>Only one filter may be checked.</Text>}
                            <TouchableOpacity onPress={handleSearch} style={[styles.textInput, {backgroundColor: colors.primary, justifyContent: 'center'}]}>
                                <Text style={{textAlign: 'center'}}>Search</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setModalVisible(false)} style={[styles.textInput, {backgroundColor: colors.primary, marginTop: '10%', justifyContent: 'center'}]}>
                                <Text style={{textAlign: 'center'}}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
        </SafeAreaView>
    )
}

const pantryStyles = StyleSheet.create({
    search: {
        backgroundColor: colors.secondary,
        borderRadius: 20,
        padding: 10,
        marginTop: 10,
        marginBottom: 10,
        height: 40,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        width: '90%',
        alignSelf: 'center'
    },
    modalStyle: {
        width: '80%',
        height: '55%',
        backgroundColor: colors.secondary,
        padding: 20,
        borderRadius: 10,
        elevation: 5,
        alignContent: 'center',
        alignSelf: 'center',
        marginTop: '50%',
        justifyContent: 'center'
    }
})

export default SearchBarFilter;