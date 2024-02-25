import { useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, Share, ActivityIndicator } from 'react-native';
import listingsData from '@/assets/data/demo-listings.json';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated, {
  SlideInDown,
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';
import { app, auth , firestore } from '../../firebase/firebase';
import { getFirestore, doc, getDoc,setDoc, updateDoc } from "firebase/firestore";
import { defaultStyles } from '@/constants/Styles';
import { useState, useEffect } from 'react';
const windowHeight = Dimensions.get('window').height;
const { width } = Dimensions.get('window');
const IMG_HEIGHT = 300;

const DetailsPage = () => {
  const { id } = useLocalSearchParams();
  const [posts, setPosts] = useState(null);
  const [listing, setlisting] = useState(null)

  React.useEffect(() => {
    async function getUser() {
        try {
            const db = getFirestore(app);
            const docRef = doc(db, "posts", id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setlisting(docSnap.data());
            } else {
                
            }
        } catch (e) {
            console.log(e)
        }
    }
    getUser();
  },[]);
  
  //const listing = (posts as any[]).find((item) => item.id === id);
  const navigation = useNavigation();
  const scrollRef = useAnimatedRef();

  const shareListing = async () => {
    try {
      await Share.share({
        title:listing.username,
        url: listing.imageURL,
      });
    } catch (err) {
      console.log(err);
    }
  };

  
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerTransparent: true,

      headerBackground: () => (
        <Animated.View style={[headerAnimatedStyle, styles.header]}></Animated.View>
      ),
      headerRight: () => (
        <View style={styles.bar}>
          <TouchableOpacity style={styles.roundButton} onPress={shareListing}>
            <Ionicons name="share-outline" size={22} color={'#000'} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.roundButton}>
            <Ionicons name="heart-outline" size={22} color={'#000'} />
          </TouchableOpacity>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity style={styles.roundButton} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={'#000'} />
        </TouchableOpacity>
      ),
    });
  }, [listing]);

  const scrollOffset = useScrollViewOffset(scrollRef);

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT, IMG_HEIGHT],
            [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(scrollOffset.value, [-IMG_HEIGHT, 0, IMG_HEIGHT], [2, 1, 1]),
        },
      ],
    };
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollOffset.value, [0, IMG_HEIGHT / 1.5], [0, 1]),
    };
  }, []);

  return (
    <View style={styles.container}>
      {listing?
      <Animated.ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        ref={scrollRef}
        scrollEventThrottle={16}>
          {listing.imageURL!="" ?
        <Animated.Image
          source={{ uri: listing.imageURL }}
          style={[styles.image, imageAnimatedStyle]}
          resizeMode="cover"
        />
        :
        <View style={{marginTop:100}}></View>
      }
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{listing.caption}</Text>
          <Text style={styles.location}>
            {/* {listing.room_type} in */}
             {listing.location}
          </Text>
          {/* <Text style={styles.rooms}>
            {listing.guests_included} guests · {listing.bedrooms} bedrooms · {listing.beds} bed ·{' '}
            {listing.bathrooms} bathrooms
          </Text> */}
           <View style={{ flexDirection: 'row', gap: 4 }}>
             
             <Text style={{ fontFamily: 'mon-sb', fontSize:18 }}>{listing.votes}</Text>
             <TouchableOpacity style={{}}>
           <Ionicons name="caret-up-circle" size={24} color="#000" />
         </TouchableOpacity>
         <TouchableOpacity style={{}}>
           <Ionicons name="caret-down-circle" size={24} color="#000" />
         </TouchableOpacity>
           </View>
          <View style={styles.divider} />

          <View style={styles.userView}>
            <Image source={{ uri: listing.userImage }} style={styles.user} />

            <View>
              <Text style={{ fontWeight: '500', fontSize: 16 }}>Posted by {listing.userName}</Text>
              <Text>Member since {Date(listing.userAge)}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <Text style={styles.description}>{listing.description}</Text>
        </View>
      </Animated.ScrollView>
      :<ActivityIndicator style={{marginVertical:windowHeight/2}} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    height: IMG_HEIGHT,
    width: width,
  },
  infoContainer: {
    padding: 24,
    backgroundColor: '#fff',
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    fontFamily: 'mon-sb',
  },
  location: {
    fontSize: 18,
    marginTop: 10,
    fontFamily: 'mon-sb',
  },
  rooms: {
    fontSize: 16,
    color: Colors.grey,
    marginVertical: 4,
    fontFamily: 'mon',
  },
  ratings: {
    fontSize: 16,
    fontFamily: 'mon-sb',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.grey,
    marginVertical: 16,
  },
  user: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: Colors.grey,
  },
  userView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  footerText: {
    height: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  footerPrice: {
    fontSize: 18,
    fontFamily: 'mon-sb',
  },
  roundButton: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    color: Colors.primary,
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  header: {
    backgroundColor: '#fff',
    height: 100,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.grey,
  },

  description: {
    fontSize: 16,
    marginTop: 10,
    fontFamily: 'mon',
  },
});

export default DetailsPage;
