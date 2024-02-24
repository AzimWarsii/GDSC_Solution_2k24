import { StyleSheet,View , Pressable ,Text} from 'react-native';
import React, { useMemo, useState } from 'react';
import ListingsBottomSheet from '@/components/ListingsBottomSheet';
import listingsData from '@/assets/data/demo-listings.json';
import { Stack } from 'expo-router';
import ExploreHeader from '@/components/ExploreHeader';

const Page = () => {
  const items = useMemo(() => listingsData as any, []);
  const [category, setCategory] = useState<string>('Events');


  const onDataChanged = (category: string) => {
    setCategory(category);
  };

  return (
    <View style={{ flex: 1, marginTop: 80 }}>
      {/* Define pour custom header */}
      <Stack.Screen
        options={{
          header: () => <ExploreHeader onCategoryChanged={onDataChanged} />,
        }}
      />
      <ListingsBottomSheet listings={items} category={category} />
    </View>
  );
 
};


export default Page;
