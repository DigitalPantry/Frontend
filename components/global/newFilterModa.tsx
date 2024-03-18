import { Text, View, SafeAreaView } from "react-native";
import styles from "../../global/styles";
import { useState } from "react";
import { CheckBox } from 'react-native-elements'
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import Button from "./Button";
import RNDateTimePicker from "@react-native-community/datetimepicker";

interface Props {
    updateFilterObject: any,
    filterObject: any,
    refreshData: any,
};

const NewFilterModal: React.FC<Props> = ({ updateFilterObject, filterObject, refreshData }) => {
    const [showExpirationFilter, setShowExpirationFilter] = useState<boolean>(Boolean(filterObject.expiresBefore));

    const toggleExpirationFilter = (state: boolean) => {
        setShowExpirationFilter(state);
        if (state)
            updateFilterObject("expiresBefore", new Date())
        else
            updateFilterObject("expiresBefore", null)
    }

    return (
        <SafeAreaView style={styles.background}>
            <View style={{ ...styles.background, paddingLeft: '12%', paddingRight: '12%' }}>
                <Text style={styles.headerText}>Filters</Text>
                {filterObject.category !== undefined && <View style={styles.inputRow}>
                    <Text style={styles.labelText}>Category:</Text>
                    <BottomSheetTextInput
                        style={styles.textInput}
                        placeholder="Category"
                        onChangeText={text => updateFilterObject("category", text)}
                        value={filterObject.category}
                        placeholderTextColor={'gray'}
                        clearButtonMode="always" />
                </View>}
                {filterObject.minQuantity !== undefined && <View style={styles.inputRow}>
                    <Text style={styles.labelText}>Min Quantity:</Text>
                    <BottomSheetTextInput
                        keyboardType='numeric'
                        style={styles.textInput}
                        placeholder="Min Quantity"
                        onChangeText={text => updateFilterObject("minQuantity", text)}
                        value={filterObject.minQuantity}
                        placeholderTextColor={'gray'}
                        clearButtonMode="always" />
                </View>}
                {filterObject.expiresBefore !== undefined && <>
                    <View style={styles.inputRow}>
                        <Text style={styles.labelText}>Filter by Expiration:</Text>
                        <CheckBox
                            checked={showExpirationFilter}
                            onPress={() => toggleExpirationFilter(!showExpirationFilter)}
                            checkedColor="black"
                        />
                    </View>
                    {showExpirationFilter && <View style={styles.inputRow}>
                        <Text style={styles.labelText}>Expires By:</Text>
                        <RNDateTimePicker value={filterObject.expiresBefore || new Date()} onChange={(e, date) => updateFilterObject("expiresBefore", date)} accentColor={'#C5A17C'} />
                    </View>}
                </>}
                <View style={{ width: '100%', marginTop: '5%' }}>
                    <Button title={"Apply Filters"} onPress={refreshData} />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default NewFilterModal;