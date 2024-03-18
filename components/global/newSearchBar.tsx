import colors from "../../global/colors";
import { View, Image, StyleSheet, TextInput, SafeAreaView, TouchableOpacity } from "react-native";
import styles from "../../global/styles";
import { useCallback, useMemo, useRef, useState } from "react";
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import NewFilterModal from "./newFilterModa";

interface Props {
    setFilterObject: Function,
    filterObject: any,
    refreshData: any,
    showFilters: boolean,
};

const NewSearchBar: React.FC<Props> = ({ showFilters, setFilterObject, filterObject, refreshData }) => {
    const [isModalVisible, setModalVisible] = useState<boolean>(false)
    const filterModalRef = useRef<BottomSheetModal>(null);

    const updateFilterObject = (filter: string, value: any) => {
        setFilterObject({ ...filterObject, [filter]: value })
    }

    const toggleFilterModal = async (state: boolean) => {
        await setModalVisible(state);
        handlePresentFilterModal();
    }

    const handlePresentFilterModal = useCallback(() => {
        filterModalRef.current?.present();
    }, []);

    const applyFilters = () => {
        toggleFilterModal(false);
        refreshData();
    }

    const filterSnapPoints = useMemo(() => ['45%'], []);

    return (
        <View style={pantryStyles.search}>
            <TextInput
                placeholder="Search..."
                value={filterObject.name}
                style={{ paddingLeft: '2%', width: '80%' }}
                onChangeText={text => updateFilterObject("name", text)}
                onEndEditing={refreshData}
                clearButtonMode="while-editing"
            />
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <TouchableOpacity onPress={refreshData}>
                    <Image
                        source={require('../../assets/searchIcon.png')}
                        style={styles.modalIcon}
                    />
                </TouchableOpacity>
                {showFilters && <TouchableOpacity onPress={() => toggleFilterModal(true)}>
                    <Image
                        source={require('../../assets/filter.png')}
                        style={styles.modalIcon}
                    />
                </TouchableOpacity>}
            </View>
            {isModalVisible && <BottomSheetModal
                ref={filterModalRef}
                index={0}
                snapPoints={filterSnapPoints}
                enablePanDownToClose
                backgroundStyle={styles.popModalHalf}
                onDismiss={() => toggleFilterModal(false)}
            >
                <NewFilterModal filterObject={filterObject} updateFilterObject={updateFilterObject} refreshData={applyFilters} />
            </BottomSheetModal>}
        </View>
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

export default NewSearchBar;