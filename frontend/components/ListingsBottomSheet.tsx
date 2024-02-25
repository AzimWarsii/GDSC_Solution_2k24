import { View, StyleSheet, Text, TouchableOpacity , FlatList } from 'react-native';
import { useMemo, useRef, useState } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import Listings from '@/components/Listings';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

interface Props {
  listings: any[];
  category: string;
  refreshing: boolean;
  onRefresh: any
}


const ListingsBottomSheet = ({listings, category, refreshing, onRefresh  }: Props) => {
  const [refresh, setRefresh] = useState<number>(0);


  return (

      <View style={styles.contentContainer}>
        <Listings listings={listings} refresh={refresh} category={category} refreshing={refreshing} onRefresh={onRefresh} />
      </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  absoluteView: {
    position: 'absolute',
    bottom:30,
    width: '100%',
    alignItems: 'center',
    //padding:10
  },
  btn: {
    backgroundColor: Colors.grey,
    padding: 14,
    height: 50,
    borderRadius: 30,
    flexDirection: 'row',
    marginHorizontal: 'auto',
    alignItems: 'center',
  },
  sheetContainer: {
    backgroundColor: '#fff',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
});

export default ListingsBottomSheet;
