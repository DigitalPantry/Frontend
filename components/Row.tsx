import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styles from '../global/styles';

interface RowProps {
  header: string;
  data?: string;
  divider: boolean;
}

const Row: React.FC<RowProps> = ({ header, data, divider }) => {
  return (
    <>
      <View style={rowStyles.rowView}>
        <Text style={rowStyles.rowHeader}>{header}</Text>
        <Text style={rowStyles.rowData}>{data}</Text>
      </View>
      {divider && <View style={styles.line} />}
    </>
  );
};

const rowStyles = StyleSheet.create({
  rowView: {
    justifyContent: 'space-between',
    alignItems: 'baseline',
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
  },
  rowHeader: {
    fontSize: 18,
  },
  rowData: {
    fontSize: 18,
  },
})

export default Row;
