import { View, Text, StyleSheet, ListRenderItem, TouchableOpacity , FlatList } from 'react-native';
import { defaultStyles } from '@/constants/Styles';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';
import { useEffect, useRef, useState } from 'react';
import { BottomSheetFlatList, BottomSheetFlatListMethods } from '@gorhom/bottom-sheet';

interface Props {
  listings: any[];
  refresh: number;
  category: string;
}

const Listings = ({ listings: items, refresh, category }: Props) => {
  const listRef = useRef(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Update the view to scroll the list back top
  // useEffect(() => {
  //   if (refresh) {
  //     scrollListTop();
  //   }
  // }, [refresh]);

  // const scrollListTop = () => {
  //   listRef.current?.scrollToOffset({ offset: 0, animated: true });
  // };

  // Use for "updating" the views data after category changed
  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, [category]);

  // Render one listing row for the FlatList
  const renderRow: ListRenderItem<any> = ({ item }) => (
    <Link href={`/listing/${item.id}`} asChild>
      <TouchableOpacity>
        <Animated.View style={styles.listing} entering={FadeInRight} exiting={FadeOutLeft}>
          <Animated.Image source={{ uri: item.photo_url }} style={styles.image} />
          <TouchableOpacity style={{ position: 'absolute', right: 30, top: 30 }}>
            {/* <Ionicons name="heart-outline" size={24} color="#000" /> */}
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 16, fontFamily: 'mon-sb', maxWidth:'90%' }}>{item.caption}</Text>
            <View style={{ flexDirection: 'row', gap: 4 }}>
             
              <Text style={{ fontFamily: 'mon-sb', fontSize:18 }}>{item.votes}</Text>
              <TouchableOpacity style={{}}>
            <Ionicons name="caret-up-circle" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={{}}>
            <Ionicons name="caret-down-circle" size={24} color="#000" />
          </TouchableOpacity>
            </View>
          </View>
          <View  style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontFamily: 'mon' }}>{item.type}</Text>

          </View>
          
         
          {/* <View style={{ flexDirection: 'row', gap: 4 }}>
            <Text style={{ fontFamily: 'mon-sb' }}>€ {item.price}</Text>
            <Text style={{ fontFamily: 'mon' }}>night</Text>
          </View> */}
        </Animated.View>
      </TouchableOpacity>
    </Link>
  );

  return (
    <View style={defaultStyles.container}>
      <FlatList
        renderItem={renderRow}
        data={loading ? [] : items}
        ref={listRef}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listing: {
    padding: 10,
    gap: 5,
    marginVertical: 10,
  },
  image: {
    width: '100%',
    height: 240,
    borderRadius: 5,
  },
  info: {
    textAlign: 'center',
    fontFamily: 'mon-sb',
    fontSize: 16,
    marginTop: 0,
  },
});

export default Listings;
