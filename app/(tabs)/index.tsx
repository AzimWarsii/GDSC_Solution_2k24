import { StyleSheet,View , Pressable ,Text ,RefreshControl, ActivityIndicator, Dimensions,} from 'react-native';
import React, { useMemo, useState } from 'react';
import ListingsBottomSheet from '@/components/ListingsBottomSheet';
import listingsData from '@/assets/data/demo-listings.json';
import { Stack } from 'expo-router';
import ExploreHeader from '@/components/ExploreHeader';
import useGetFeedPosts from "../../hooks/useGetFeedPosts";
const windowHeight = Dimensions.get('window').height;
import AsyncStorage from '@react-native-async-storage/async-storage';
const Page = () => {
  
  const items = useMemo(() => posts as any, []);
  const [category, setCategory] = useState<string>('Events');
  const [refreshing, setRefreshing] = useState(false);
  const { isLoading, posts , getFeedPosts } = useGetFeedPosts();
  //console.log(posts)
  React.useEffect(() => {
    async function getPosts() {
        try {
            getFeedPosts()
            if (posts) {
              AsyncStorage.setItem('posts', JSON.stringify(posts));

            } else {
                
            }
        } catch (e) {
            console.log(e)
        }
    }
    getPosts();
  },[refreshing]);
  //AsyncStorage.setItem('posts', JSON.stringify(posts));
  // const [items, setItems] = useState("")
  // setItems(posts)
 

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);


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
      {posts?<><ListingsBottomSheet listings={posts} category={category} refreshing={refreshing} onRefresh={onRefresh} /></> :<><ActivityIndicator style={{marginVertical:windowHeight/3}} /></> }

      
    </View>
  );
 
};


export default Page;
